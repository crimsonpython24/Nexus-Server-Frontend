import { Button, Image, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import dragons from '../../assets/here-be-dragons.png';
import './404.css';

const App: React.FC = () => {
  return (
    <>
      <div className="error-body">
        <Result
          icon={<Image width={500} src={dragons} preview={false} />}
          title="It seems like you're lost... do anything but to open the box. Of nil but disappointment."
          extra={
            <Link to="/">
              <Button type="primary">Go Back Home</Button>
            </Link>
          }
        />
      </div>
    </>
  );
};

export default App;
