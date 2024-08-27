import { diff, findPatches } from './BaseComponentHelper'
import { Patch, WorkerData } from './BaseComponentType'

/* eslint-disable @typescript-eslint/no-explicit-any */
type Task = {
  resolve: (value: any) => void
  reject: (reason: any) => void
  message: any
}

class Pool {
  private static instance: Pool
  public static getInstance(poolSize: number, workerScript: string): Pool {
    if (!Pool.instance) {
      Pool.instance = new Pool(poolSize, workerScript)
    }
    return Pool.instance
  }

  private pool: Worker[]
  private taskQueue: Task[]
  private workerTasks: Map<Worker, Task> // Map to associate workers with their current tasks

  private constructor(private poolSize: number, workerScript: string) {
    this.pool = []
    this.taskQueue = []
    this.workerTasks = new Map()

    for (let i = 0; i < poolSize; i++) {
      const worker = new Worker(workerScript)
      worker.onmessage = (e) => this.onWorkerMessage(worker, e)
      worker.onerror = (err) => this.onWorkerError(worker, err)
      this.pool.push(worker)
    }
  }

  private onWorkerMessage(worker: Worker, event: MessageEvent): void {
    const task = this.workerTasks.get(worker)
    if (task) {
      task.resolve(event.data)
      this.workerTasks.delete(worker) // Free the worker by removing it from the map
      this.assignTask() // Try to assign the next task
    }
  }

  private onWorkerError(worker: Worker, error: ErrorEvent): void {
    const task = this.workerTasks.get(worker)
    if (task) {
      task.reject(error)
      this.workerTasks.delete(worker) // Free the worker by removing it from the map
      this.assignTask() // Try to assign the next task
    }
  }

  private assignTask(): void {
    if (this.taskQueue.length === 0) {
      return // No tasks in the queue
    }

    const availableWorker = this.pool.find((worker) => !this.workerTasks.has(worker))

    if (availableWorker) {
      const task = this.taskQueue.shift()!
      this.workerTasks.set(availableWorker, task) // Assign the task to the worker
      availableWorker.postMessage(task.message)
    }
  }

  public executeTask(message: WorkerData): Promise<Patch[]> {
    const serializedMessage = JSON.stringify(message)
    if (this.poolSize < 1) {
      return new Promise((resolve, reject) => {
        try {
          const deserializedMessage = JSON.parse(serializedMessage) as WorkerData

          const result = findPatches(deserializedMessage)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    } else {
      return new Promise((resolve, reject) => {
        this.taskQueue.push({ resolve, reject, message: serializedMessage })
        this.assignTask()
      })
    }
  }

  public size() {
    return this.poolSize
  }
}

export const WorkerPool = Pool.getInstance(2, '/worker.min.js')
