import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { deleteFragment } from '../../api';
import { useNavigate } from 'react-router-dom';

import { getFragmentById, getFragmentDataByExt, getFragmentByIdInfo } from '../../api';

function FragmentContent({ fragmentData }) {
  if (fragmentData.contentType.startsWith('text/html')) {
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: fragmentData.data }} />
      </div>
    );
  } else if (fragmentData.contentType.startsWith('image/')) {
    return (
      <div>
        <img
          src={URL.createObjectURL(fragmentData.data)}
          alt=""
          style={{ width: '50%', height: '50%' }}
        />
      </div>
    );
  } else if (fragmentData.contentType.startsWith('application/')) {
    return (
      <div>
        <p>{JSON.stringify(fragmentData.data)}</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>{fragmentData.data}</p>
      </div>
    );
  }
}

function FragmentView() {
  const [fragmentData, setData] = useState(null);
  const [fragmentMetadata, setMetadata] = useState(null);
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    try {
      const deleted = await deleteFragment(user, fragmentMetadata.fragment.id);
    } catch (e) {
      console.log(e);
    }
    navigate(`/dashboard`);
  };

  const { id } = useParams();
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    async function getFragmentData() {
      const data = await getFragmentById(user, id);
      setData(data);
    }
    async function getFragmentMetadata() {
      const meta = await getFragmentByIdInfo(user, id);
      setMetadata(meta);
    }
    getFragmentData();
    getFragmentMetadata();
  }, [user]);

  return user
    ? fragmentData && fragmentMetadata && (
        <div className="container">
          <hr />
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-0">
              <h5>Here is the content of fragment with id {id}</h5>
              <FragmentContent fragmentData={fragmentData} />
              <div>
                <hr />
                <h5>Here is the metadata for the fragment:</h5>
                <h6 className="card-title">ID: {fragmentMetadata.fragment.id}</h6>
                <div className="card-body">
                  <p className="card-text">
                    Created: {new Date(fragmentMetadata.fragment.created).toLocaleString()}
                  </p>
                  <p className="card-text">
                    Updated: {new Date(fragmentMetadata.fragment.updated).toLocaleString()}
                  </p>
                  <p className="card-text">Size: {fragmentMetadata.fragment.size}</p>
                  <p className="card-text">Type: {fragmentMetadata.fragment.type}</p>
                </div>
                <button
                  className="btn btn-sm btn-primary pull-xs-right"
                  onClick={() => {
                    handleDeleteClick();
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-sm btn-primary pull-xs-right"
                  onClick={() => {
                    navigate(`/fragment/update/${fragmentMetadata.fragment.id}`);
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    : null;
}

export default FragmentView;
