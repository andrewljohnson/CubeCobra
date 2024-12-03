import React from 'react';
import { CardBody, CardHeader } from 'reactstrap';

import ContentPropType from 'proptypes/ContentPropType';
import ReactPlayer from 'react-player';
import TimeAgo from 'react-timeago';

import Text from 'components/base/Text';
import CommentsSection from 'components/comments/CommentsSection';
import Markdown from 'components/Markdown';
import Username from 'components/Username';

const Video = ({ video }) => {
  return (
    <>
      <CardHeader>
        <Text semibold xl>{video.title}</Text>
        <Text semibold sm>
          By <Username user={video.owner} />
          {' | '}
          <TimeAgo date={video.date} />
        </Text>
      </CardHeader>
      <CardBody>
        <div className="player-wrapper">
          <ReactPlayer className="react-player" url={video.url} width="100%" height="100%" />
        </div>
      </CardBody>
      <CardBody>
        <Markdown markdown={video.body} />
      </CardBody>
      <div className="border-top">
        <CommentsSection parentType="video" parent={video.id} collapse={false} />
      </div>
    </>
  );
};
Video.propTypes = {
  video: ContentPropType.isRequired,
};

export default Video;
