import Reblend from 'reblendjs';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function TooltipPositionedExample() {
  return (
    <>
      {['top', 'right', 'bottom', 'left'].map(placement => (
        <OverlayTrigger
          key={placement}
          placement={'auto'}
          overlay={"Overlaying"/* Reblend.wrapChildrenToReact(
            <Tooltip id={`tooltip-${placement}`}>
              Tooltip on <strong>{placement}</strong>.
            </Tooltip>,
          ) */}
        >
          <Button variant="secondary">Tooltip on {placement}</Button>
        </OverlayTrigger>
      ))}
    </>
  );
}

export default TooltipPositionedExample;
