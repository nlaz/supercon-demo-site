
const defaultTrackImage = "https://evenings.s3.us-east-2.amazonaws.com/images/1703883206523.png";

const getArcPath = (arcSize, rotation) => {
  const radius = 45;
  const centerX = 50;
  const centerY = 50;

  const startAngle = (rotation * Math.PI) / 180;
  const endAngle = ((rotation + arcSize) * Math.PI) / 180;

  const startX = centerX + radius * Math.cos(startAngle);
  const startY = centerY - radius * Math.sin(startAngle);
  const endX = centerX + radius * Math.cos(endAngle);
  const endY = centerY - radius * Math.sin(endAngle);

  return `
    M ${centerX} ${centerY}
    L ${startX} ${startY}
    A ${radius} ${radius} 0 0 0 ${endX} ${endY}
    Z
  `;
}
const ImageViewer = ({ image, playing }) => {
  const arcPath1 = getArcPath(30, 40);
  const arcPath2 = getArcPath(30, 40 + 180);
  const arcPath3 = getArcPath(5, 55 + 180);
  const arcPath4 = getArcPath(5, 55);

  return (
    <div className="relative w-[90px] h-[90px]">
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <defs>
          <mask id="circleMask">
            <circle cx="50" cy="50" r="46" fill="white" />
            <circle cx="50" cy="50" r="15" fill="black" />
          </mask>
        </defs>

        <image href={image ?? defaultTrackImage} width="100" height="100" mask="url(#circleMask)" preserveAspectRatio="xMidYMid slice">
          {playing && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </image>

        <path
          d={arcPath1}
          fill="white"
          opacity="0.20"
          stroke="white"
          strokeWidth="4"
          mask="url(#circleMask)"
        />

        <path
          d={arcPath2}
          fill="white"
          opacity="0.20"
          stroke="white"
          strokeWidth="4"
          mask="url(#circleMask)"
        />

        <path
          d={arcPath3}
          fill="white"
          opacity="0.2"
          stroke="white"
          strokeWidth="4"
          mask="url(#circleMask)"
        />

        <path
          d={arcPath4}
          fill="white"
          opacity="0.2"
          stroke="white"
          strokeWidth="4"
          mask="url(#circleMask)"
        />

        <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="2" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="5" />
      </svg>
    </div>
  );
};

export default ImageViewer;
