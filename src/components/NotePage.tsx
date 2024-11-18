import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customAlphabet, nanoid } from "nanoid";
// import { notes } from "../database/db";


export function NotePage() {
  const { foo } = useParams();
  const navigate = useNavigate();
  let readOnly: boolean = false;

  const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',5);

  let textAreaValue = "";
  let savedAreaValue = "";

  let notes = JSON.parse(localStorage.getItem('notes'));

  for(let i=0;i<notes.length;i++)
  {
    if(foo==notes[i].id)
    {
        textAreaValue = notes[i].content;
        savedAreaValue = textAreaValue;
        readOnly=true;
        break;
    }
  }
  if(textAreaValue=="")
  {
    // window.location.href = "/";
    navigate("/home",{replace: true});
  }

  function displayNote():void {
    if(textAreaValue.trim()!=savedAreaValue.trim())
    {
        const docId = nanoid();
        console.log(docId);
    
        notes.push({
            "id": docId,
            "content": textAreaValue
            // "expiration": Timestamp.fromMillis(Date.now() + 2 * 24 * 60 * 60 * 1000)
        })
        localStorage.setItem('notes',JSON.stringify(notes));
        navigate("/"+docId);
    }
  }

  return (
    <div>
      <div>
        <div className="text-3xl">Share Notes</div>
        <div className="mt-2">
          Create notes and share using small easy to type links
        </div>
      </div>
      <div className="mt-5">
        <textarea
          onChange={(e) => {
            textAreaValue = e.target.value;
          }}
          readOnly={readOnly}
          defaultValue={textAreaValue}
          className="peer h-full min-h-[500px] w-full resize-none rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all duration-75 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900  focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
          placeholder="Put in your notes here"
        ></textarea>
      </div>
      <div className="flex justify-between">
        <div>
          <button
            // disabled
            onClick={displayNote}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Generate URL
          </button>
        </div>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
}
