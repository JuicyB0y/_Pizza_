import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props: any) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="27" y="270" rx="3" ry="3" width="205" height="23" />
    <circle cx="130" cy="129" r="129" />
    <rect x="22" y="305" rx="0" ry="0" width="229" height="94" />
    <rect x="8" y="423" rx="14" ry="14" width="99" height="27" />
    <rect x="135" y="415" rx="19" ry="19" width="135" height="43" />
  </ContentLoader>
);

export default Skeleton;
