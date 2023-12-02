import * as React from 'react';

export default function Footer() {
  return (
    <React.Fragment>
      <footer>
        <p>
          Powered by Chanmony KEAT
        </p>
      </footer>
      <style jsx>{`
  footer {
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
}
  footer p {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: inherit;
}
  `}
      </style>
    </React.Fragment>
  );
}
