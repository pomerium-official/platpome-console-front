import React, { useEffect, useState } from 'react';

interface FilterConditionsProps {
  conditions?: {
    field: string;
    condition: { name: string; value: string; checked?: boolean }[];
  };
  selected?: (e: {
    field: string;
    condition: { name?: string; value?: string; checked?: boolean }[];
  }) => void;
  radio?: boolean;
}

const FilterConditions = ({
  conditions,
  selected,
  radio = true,
}: FilterConditionsProps) => {
  const [data, setData] = useState<
    { name: string; value: string; checked?: boolean }[]
  >();
  const [selectedData, setSelectedData] = useState<{
    field: string;
    condition: { name?: string; value?: string; checked?: boolean }[];
  }>({
    field: conditions?.field ?? '',
    condition: [{ name: undefined, value: undefined }],
  });

  useEffect(() => {
    setData(conditions?.condition);
  }, [conditions]);

  useEffect(() => {
    if (selectedData.condition[0].value) {
      selected && selected(selectedData);
    }
  }, [selectedData]);

  return (
    <>
      {data?.map((v, i) => {
        return (
          <button
            onClick={() => {
              setData((prev) => {
                return prev?.map((w, j) => {
                  if (i === j) {
                    if (radio) {
                      return { ...w, checked: true };
                    }
                    if (v.value === 'all') return { ...w, checked: true };
                    return { ...w, checked: !w.checked };
                  } else {
                    if (radio) {
                      return { ...w, checked: false };
                    }
                    if (v.value === 'all') {
                      return { ...w, checked: false };
                    } else {
                      if (w.value === 'all') {
                        return { ...w, checked: false };
                      }
                      return { ...w };
                    }
                  }
                });
              });
              setSelectedData((prev) => {
                if (radio) {
                  return {
                    field: conditions?.field ?? '',
                    condition: [v],
                  };
                } else {
                  if (v.value === 'all') {
                    return { field: prev.field, condition: [v] };
                  } else {
                    if (prev) {
                      return {
                        field: prev.field,
                        condition: [
                          ...prev.condition.filter((f) => f.value !== v.value),
                          v,
                        ],
                      };
                    } else {
                      return {
                        field: conditions?.field ?? '',
                        condition: [v],
                      };
                    }
                  }
                }
              });
            }}
            className={v.checked ? 'checked' : ''}
            key={`${v.name}${i}`}
          >
            {v.name}
          </button>
        );
      })}
    </>
  );
};

export default FilterConditions;
