import useMergeState, { MergeStateSetter } from './useMergeState'

type Mapper<TProps, TState> = (
  props: TProps,
  state: TState,
) => null | Partial<TState>

export default function useMergeStateFromProps<TProps, TState extends {}>(
  props: TProps,
  gDSFP: Mapper<TProps, TState>,
  initialState: TState,
): { mergedState: TState; updater: MergeStateSetter<TState> } {
  const { mergedState, updater } = useMergeState<TState>(initialState)

  const nextState = gDSFP(props, mergedState)

  if (nextState !== null) updater(nextState)

  return { mergedState, updater }
}
