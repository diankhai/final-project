import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';

interface HeadingType {
  logoURL: string;
}

export default function Header(props: HeadingType) {
  const { logoURL } = props;

  return (
    <React.Fragment>
      <Toolbar sx={{ backgroundColor:'black' }}>
        <img className="logoHeader" src={logoURL} alt="" />
      </Toolbar>
    </React.Fragment>
  );
}