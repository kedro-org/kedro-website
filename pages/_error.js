function Error({ statusCode, response, error }) {
  console.log('response: ', response);
  console.log('error: ', error);

  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, response, error };
};

export default Error;
