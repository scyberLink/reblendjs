import { useMemo, useState } from 'reblendjs';

//@ReblendHook
function useI(): [string, number] {
  const [s, setS] = useState(1);

  setInterval(() => {
    setS(pre => pre + 2);
  }, 1000);

  const msg = useMemo(() => `State = "${s}"`, [s]);

  return [msg, s];
}

export default useI;
