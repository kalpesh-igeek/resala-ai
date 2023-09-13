import React from 'react';

const EditTemplate = () => {
  const [inputButtonBox, setInputButtonBox] = useState(false);

  const handleInputButtonBox = () => {
    setInputButtonBox(!inputButtonBox);
  };
  return (
    <div className="px-[20px] py-[12px] relative mt-[12px]">
      <div className="col-span-full">
        <div className="w-full flex gap-2 justify-center mb-[8px]">
          <div className="w-full">
            <label for="input" className="block text-[12px] font-bold leading-6 text-gray1">
              TEMPLATE NAME
            </label>
            <input
              id="requestedText"
              name="input_text"
              //   value={selectedTemplate?.name}
              // onChange={(e) => handleChangeCompose(e)}
              placeholder="Lorem ipsum dolor sit amet consectetur."
              className="block w-full rounded-md border border-gray mt-[4px] px-7 py-[16px] text-[14px] mb-[12px] text-darkBlue placeholder:text-gray1"
            />
          </div>
          <div className="w-full">
            <label for="input" className="block text-[12px] font-bold leading-6 text-gray1">
              TEMPLATE TYPE
            </label>
            <input
              id="requestedText"
              name="input_text"
              // value={selectedText.input_text}
              value={selectedTemplate?.type?.name}
              // onChange={(e) => handleChangeCompose(e)}
              placeholder="Lorem ipsum dolor sit amet consectetur."
              className="block w-full rounded-md border border-gray mt-[4px] px-7 py-[16px] text-[14px] mb-[12px] text-darkBlue placeholder:text-gray1"
            />
          </div>
        </div>
        <div className="pb-[20px] mt-[8]">
          <div className="flex justify-between item-center">
            <label for="input" className="block text-[12px] font-bold leading-6 text-gray1 whitespace-nowrap">
              SAVED TEMPLATE
            </label>
          </div>
          <textarea
            style={{ resize: 'none' }}
            id="requestedText"
            name="reply"
            rows="4"
            // value={selectedTemplate.output_text}
            // onChange={(e) => handleChangeCompose(e)}
            placeholder="Lorem ipsum dolor sit amet consectetur."
            className="text-[14px] border-gray block w-full rounded-md border p-1.5"
          />
        </div>
      </div>

      <div className="mt-1">
        <div className="flex gap-2 items-center">
          <button
            className="w-full rounded-md bg-white px-1 py-[10px] focus:outline-none text-[16px] font-medium text-darkgray1 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
            // onClick={(e) => handleGenerateDraft(e)}
            // disabled={resultText !== '' ? '' : 'disabled'}
          >
            Regenerate
          </button>
          <button
            className="w-full rounded-md bg-white px-1 py-[10px] text-[16px] focus:outline-none font-medium text-darkgray1 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
            // disabled={resultText !== '' ? '' : 'disabled'}
            // onClick={handleCopyDraft}
          >
            Copy
          </button>
          <button
            className="w-full rounded-md bg-primaryBlue px-1 focus:outline-none py-[10px] text-[16px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
            // disabled={resultText !== '' ? '' : 'disabled'}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTemplate;
