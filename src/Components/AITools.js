import React from 'react';

const AITools = ({ inputButtonBox, handleInputButtonBox, selectedAction, setSelectedAction }) => {
  return (
    <>
      <div className="pt-[16px] pb-[10px] flex gap-2 justify-between items-center">
        <div className="flex text-[14px] font-medium text-darkBlue whitespace-nowrap">AI Tools</div>

        {!inputButtonBox && (
          <div className="flex gap-2 items-center w-full" onClick={handleInputButtonBox}>
            {selectedItems.map((item) => (
              <button className="w-full rounded-md px-1 py-2 text-[12px] font-medium text-darkBlue border bg-lightblue1 border-lightblue">
                {item.name}
              </button>
            ))}
          </div>
        )}

        <div
          className={`w-[20px] flex text-[14px] font-medium text-darkBlue whitespace-nowrap justify-center cursor-pointer ${
            !inputButtonBox ? '-rotate-90' : ''
          }`}
          onClick={handleInputButtonBox}
        >
          <img src={ArrowDown} />
        </div>
      </div>
      
      <div className={!inputButtonBox ? `hidden` : `block`}>
        <div className="pb-[20px]">
          <div className="flex gap-1 items-center">
            <img src={actionIcon} />
            <label for="actions" className="block text-[12px] font-bold leading-6 text-gray1">
              ACTION
            </label>
          </div>
          <RadioGroup value={selectedAction} onChange={setSelectedAction}>
            <div className="inline-flex gap-2 items-center">
              {actions.map((action, index) => (
                <RadioGroup.Option
                  name="action"
                  key={action.name}
                  value={action}
                  onClick={(e) => handleInputAction(e, index, action)}
                  className={({ active, checked }) =>
                    classNames(
                      'cursor-pointer text-darkBlue',
                      active || checked ? 'border-lightblue bg-lightblue1' : '',
                      'w-[87px] group relative flex items-center justify-center rounded-md border border-gray px-1 py-2 text-[12px] font-medium hover:border-lightblue hover:bg-lightblue1'
                    )
                  }
                >
                  <RadioGroup.Label as="span">{action.name}</RadioGroup.Label>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
        <div className="pb-[20px]">
          <div className="flex gap-1 items-center">
            <img src={lengthIcon} />
            <label for="actions" className="block text-[12px] font-bold leading-6 text-gray1">
              LENGTH
            </label>
          </div>
          <RadioGroup value={selectedLength} onChange={setSelectedLength}>
            <div className="inline-flex gap-2 items-center">
              {lengths.map((length, index) => (
                <RadioGroup.Option
                  name="length"
                  key={length.name}
                  value={length}
                  onClick={(e) => handleInputLength(e, index, length)}
                  className={({ active, checked }) =>
                    classNames(
                      'cursor-pointer text-darkBlue',
                      active || checked ? 'border-lightblue bg-lightblue1' : '',
                      'w-[87px] group relative flex items-center justify-center rounded-md border border-gray px-1 py-2 text-[12px] font-medium hover:border-lightblue hover:bg-lightblue1'
                    )
                  }
                >
                  <RadioGroup.Label as="span">{length.name}</RadioGroup.Label>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
        <div className="pb-[20px]">
          <div className="flex gap-1 items-center">
            <img src={toneIcon} />
            <label for="actions" className="block text-[12px] font-bold leading-6 text-gray1">
              TONE
            </label>
          </div>
          <RadioGroup value={selectedTone} onChange={setSelectedTone}>
            <div className="inline-flex gap-2 items-center">
              {tones.map((tone, index) => (
                <RadioGroup.Option
                  name="length"
                  key={tone.name}
                  value={tone}
                  onClick={(e) => handleInputTone(e, index, tone)}
                  className={({ active, checked }) =>
                    classNames(
                      'cursor-pointer text-darkBlue',
                      active || checked ? 'border-lightblue bg-lightblue1' : '',
                      'w-[87px] group relative flex items-center justify-center rounded-md border border-gray px-1 py-2 text-[12px] font-medium hover:border-lightblue hover:bg-lightblue1'
                    )
                  }
                >
                  <RadioGroup.Label as="span">{tone.name}</RadioGroup.Label>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
        <div className="pb-[10px]">
          <div className="flex gap-1 items-center">
            <img src={languageIcon} />
            <label for="actions" className="block text-[12px] font-bold leading-6 text-gray1 uppercase">
              Language
            </label>
          </div>
          <RadioGroup value={selectedLanguage} onChange={setSelectedLanguage}>
            <div className="inline-flex gap-2 items-center">
              {languages.map((language, index) => (
                <RadioGroup.Option
                  name="length"
                  key={language.name}
                  value={language}
                  onClick={(e) => handleInputLanguage(e, index, language)}
                  className={({ active, checked }) =>
                    classNames(
                      'cursor-pointer text-darkBlue',
                      active || checked ? 'border-lightblue bg-lightblue1' : '',
                      'w-[87px] group relative flex items-center justify-center rounded-md border border-gray px-1 py-2 text-[12px] font-medium hover:border-lightblue hover:bg-lightblue1'
                    )
                  }
                >
                  <RadioGroup.Label as="span">{language.name}</RadioGroup.Label>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
    </>
  );
};

export default AITools;
