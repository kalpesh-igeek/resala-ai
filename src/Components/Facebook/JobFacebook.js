import React from 'react';
import './Facebook.css';

import Send from '../../utils/Facebook/send.png';
import Bag from '../../utils/Facebook/bag.png';
import Left from '../../utils/Facebook/arrow-left.png';

function JobFacebook() {
  return (
    <div>
      <div>
        <img src={Left} alt="" className="w-[24px]" />
        Back
      </div>
      <div className="rounded-md">
        <div
          className="bg-[#EEF6FF] "
          onClick={() => {
            setIdeas(false);
            setIntro(true);
          }}
        >
          <img src={Bag} alt="" className="w-[24px]" />
          <p className="text-[#5F6583] text-[14px]">Job Post</p>
        </div>
        <div className="grid grid-cols-12">
          <div>
            <textarea
              style={{ resize: 'none' }}
              id="requestedText"
              name="input_text"
              rows="6"
              maxLength="4000"
              placeholder="Tell me what to write for you"
              className="text-[14px] border-gray block w-full rounded-md border p-1.5 mb-[10px]"
              required={true}
            />
          </div>
          <div>
            <img src={Send} alt="" className="w-[20px]" />
          </div>
        </div>
        <div className="col-span-12 grid place-items-end">
          <p className="text-[12px] text-[#B1BED2]">0/4000</p>
        </div>
      </div>
    </div>
  );
}

export default JobFacebook;
