import { findPatches } from './BaseComponentHelper'
import { Patch, WorkerData } from './BaseComponentType'

onmessage = function (event) {
  const data: WorkerData | undefined = JSON.parse(event.data || '')

  if (data) {
    const patches: Patch[] = findPatches(data)
    postMessage(patches)
  }
}
