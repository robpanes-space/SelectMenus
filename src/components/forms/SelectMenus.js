/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useCallback, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { isNullOrEmpty } from "@/utils";
import Image from "next/image";
import { cn } from "@/utils/fn";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectMenus({ label, dataSelect, setSelected, defaultValue = "", className = "" }) {
  const [selected, setSelectedTarget] = useState(dataSelect[0]);

  useEffect(() => {
    if (!isNullOrEmpty(defaultValue)) {
      const _data = dataSelect.find((data) => data.name === defaultValue);
      if (!isNullOrEmpty(_data)) {
        setSelectedTarget(_data);
      }
    }
  }, [defaultValue]);

  const onChangeSelect = useCallback(
    (e) => {
      setSelected(e);
      setSelectedTarget(e);
    },
    [selected]
  );

  return (
    <Listbox value={selected} onChange={(e) => onChangeSelect(e)} className="z-100">
      {({ open }) => (
        <>
          <div className="relative mt-0">
            <Listbox.Button
              className={cn(
                "relative w-full cursor-default rounded-md bg-white pl-2 pr-10 py-3 text-left text-gray-900 shadow-sm border focus:outline-none sm:text-sm sm:leading-6",
                className
              )}
            >
              <span className="flex items-center">
                {!isNullOrEmpty(selected?.avatar) && (
                  <Image src={selected.avatar} alt="picture" className="h-5 w-5 flex-shrink-0 rounded-full" />
                )}
                <span className="ml-3 block truncate">{selected?.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute zHigh mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {dataSelect.map((data) => (
                  <Listbox.Option
                    key={data.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-gray-300 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-1 pr-6"
                      )
                    }
                    value={data}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {!isNullOrEmpty(data?.avatar) && (
                            <Image src={data.avatar} alt="picture" className="h-5 w-5 flex-shrink-0 rounded-full" />
                          )}
                          <span
                            className={classNames(selected ? "font-semibold" : "font-normal", "ml-3 block truncate")}
                          >
                            {data.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-gray-300",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
