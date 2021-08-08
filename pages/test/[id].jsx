import { useRouter } from 'next/router';
import React from 'react';

const Test = () => {
    const Router = useRouter();
    const {id} = Router.query
    return (
        <div>
          post {id}
        </div>
    );
};

export default Test;