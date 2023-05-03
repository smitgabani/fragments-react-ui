import React, { useState } from 'react';
import { postFragment } from '../../api';
import { useSelector } from 'react-redux';

function CreateFragmentForm({ selectedType }) {
  if (selectedType.startsWith('text')) {
    return (
      <div>
        <textarea></textarea>
      </div>
    );
  } else if (selectedType.startsWith('image')) {
  }
}

export default function CreateFragment() {
  const user = useSelector((state) => state.user.value);
  const [selectedType, setSelectedType] = useState('text/plain');
  const [selectedFile, setSelectedFile] = useState(null);

  function handleSelectChange(e) {
    e.preventDefault();
    setSelectedType(e.target.value);
  }

  function handleFile(evt) {
    evt.preventDefault();
    const files = evt.target.files;
    setSelectedFile(evt.target.files[0]);
    const f = files[0];
    const reader = new FileReader();
    reader.onload = (function () {
      return async function (e) {
        console.log('uploaded file type: ' + f.type);
        if (selectedType && selectedType !== f.type) {
          alert('Uploaded file type must be same as selected type.');
        } else {
          let fragment;
          console.log('------>' + e.target.result);
          try {
            fragment = await postFragment(user, e.target.result, f.type);

            if (fragment) {
              //fragmentToDisplay.innerHTML = `Fragment of type ${fragment.fragment.type} with id: ${fragment.fragment.id} is ${selectedFeature}d!`;
            }
          } catch (e) {
            //fragmentToDisplay.innerText = e;
          }
        }
      };
    })(f);
    reader.readAsArrayBuffer(f);
  }
  return (
    <div className="profile-page">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <br></br>
            <h4>Create a new Fragment: </h4>
            <section id="type">
              <label for="types">Choose a fragment type to create:</label>
              <select id="types" name="typeList" form="typeform" onChange={handleSelectChange}>
                <option value="text/plain">text/plain</option>
                <option value="text/markdown">text/markdown</option>
                <option value="text/html">text/html</option>
                <option value="application/json">application/json</option>
                <option value="image/png">image/png</option>
                <option value="image/jpeg">image/jpeg</option>
                <option value="image/webp">image/webp</option>
                <option value="image/gif">image/gif</option>
              </select>
              <br />
            </section>
            <section id="fileImport">
              <label className="button" tabindex="0">
                Import a file which is of type {selectedType}:
                <br />
                <input type="file" id="inputFile" multiple onChange={handleFile} />
              </label>
              <br />
            </section>
            {/* <CreateFragmentForm selectedType={selectedType} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
