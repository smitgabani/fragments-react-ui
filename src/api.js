// src/api.js

// fragments microservice API, defaults to localhost:8080
const apiUrl = 'http://ec2co-ecsel-1neb1d1s7wml7-1505063813.us-east-1.elb.amazonaws.com:8080';

/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
export async function getUserFragments(user, expand = 0) {
  console.log('Requesting user fragments data...');
  try {
    const res = await fetch(`${apiUrl}/v1/fragments?expand=${expand}`, {
      headers: {
        // Include the user's ID Token in the request so we're authorized
        Authorization: `Bearer ${user.idToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Got user fragments data', { data });
    return { data };
  } catch (err) {
    console.error('Unable to call GET /v1/fragments', { err });
  }
}

export async function postFragment(user, textFragment, contentType = 'text/plain') {
  console.log('Creating a new fragment');
  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      method: 'POST',
      headers: {
        // Include the user's ID Token in the request so we're authorized
        Authorization: `Bearer ${user.idToken}`,
        'Content-Type': `${contentType}`,
      },
      body: `${textFragment}`,
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Successfully created fragment', { data });
    return data.fragment;
  } catch (err) {
    console.error('Unable to call POST /v1/fragment', { err });
    return null;
  }
}

export async function deleteFragment(user, fragmentId) {
  console.log('Creating a new fragment');
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${fragmentId}`, {
      method: 'DELETE',
      headers: {
        // Include the user's ID Token in the request so we're authorized
        Authorization: `Bearer ${user.idToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Successfully Deleted fragment', { data });
    return data.fragment;
  } catch (err) {
    console.error('Unable to call DELETE /v1/fragment', { err });
    return null;
  }
}

export async function getFragmentById(user, id, ext = '') {
  console.log(`Requesting user fragment data by id ${id}`);
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}${ext}`, {
      headers: {
        // Include the user's ID Token in the request so we're authorized
        Authorization: `Bearer ${user.idToken}`,
      },
    });
    if (!res.ok) {
      const error = await res.json();
      throw error.error?.message || res.statusText;
    }
    console.log('Got fragments data with given id', res);
    console.log('res content type', res.headers.get('content-type'));
    const contentType = res.headers.get('content-type');
    if (contentType.startsWith('text/')) {
      try {
        return { contentType, data: await res.text() };
      } catch (e) {
        console.error('cannot return text fragment', { e });
      }
    } else if (contentType.startsWith('application/json')) {
      try {
        return { contentType, data: await res.json() };
      } catch (e) {
        console.error('cannot return json fragment', { e });
      }
    } else if (contentType.startsWith('image/')) {
      try {
        const myBlob = await res.blob();
        return { contentType, data: myBlob };
      } catch (e) {
        console.error('cannot return image blob', { e });
      }
    }
  } catch (err) {
    console.error('Unable to call GET /v1/fragments/:id', { err });
    throw new Error(err);
  }
}

export async function getFragmentDataByExt(user, fragmentId, ext = 'txt') {
  console.log('Retrieving data');

  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${fragmentId}${ext}`, {
      // Include the user's ID Token in the request so we're authorized
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Got user fragments data', { data });
    return data.fragment;
  } catch (err) {
    console.error('Unable to call GET /v1/fragment', { err });
  }
}

export async function putFragment(user, textFragment, contentType = 'text/plain', fragmentId) {
  console.log('Updating fragment');
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${fragmentId}`, {
      method: 'PUT',
      // cannnot use authorizationHeaders() because i have to add content type
      headers: {
        // Include the user's ID Token in the request so we're authorize
        Authorization: `Bearer ${user.idToken}`,
        'Content-Type': `${contentType}`,
      },
      body: `${textFragment}`,
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Successfully created fragment', { data });
    return data.fragment;
  } catch (err) {
    console.error('Unable to call PUT /v1/fragment', { err });
    return null;
  }
}
// test git
export async function getFragmentByIdInfo(user, id) {
  console.log(`Requesting user fragment metadata by id ${id}`);
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}/info`, {
      headers: {
        // Include the user's ID Token in the request so we're authorized
        Authorization: `Bearer ${user.idToken}`,
      },
    });
    if (!res.ok) {
      const error = await res.json();
      throw error.error?.message || res.statusText;
    }
    const data = await res.json();
    console.log('Got fragment metadata', { data });
    return data;
  } catch (err) {
    console.error('Unable to call GET /v1/fragments/:id', { err });
    throw new Error(err);
  }
}
/// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// 
/// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// 
/// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// 

export async function getUserInfo(user) {
  console.log('Requesting user data...');
  try {
    const res = await fetch(`${apiUrl}/v1/user`, {
      headers: {
        // Include the user's ID Token in the request so we're authorized
        Authorization: `Bearer ${user.idToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Got user data', { data });
    return { data };
  } catch (err) {
    console.error('Unable to call GET /v1/user', { err });
  }
}

export async function getUserImage(user) {
  console.log('Requesting user image...');
  try {
    const res = await fetch(`${apiUrl}/v1/user/image`, {
      headers: {
        // Include the user's ID Token in the request so we're authorized
        Authorization: `Bearer ${user.idToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Got user data', { data });
    return { data };
  } catch (err) {
    console.error('Unable to call GET /v1/user/image', { err });
  }
}