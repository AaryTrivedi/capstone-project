import React, { useState } from 'react';
import { useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { getLocationsByName } from '../../api/map';

export function LocationAutoComplete ({ onChange, initialValue={}, zIndex=0, zIndexInverse=0 }){
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState({});

    const handleSearchTextChange = (text) => {
        setLoading(true);
        getLocationsByName(text)
            .then(result => {
                const [response, error] = result;
                if (response && response.data && response.data.predictions) {
                    const data = response.data.predictions.map(
                        (element, idx) => ({
                            ...element,
                            label:
                                idx +
                                1 +
                                " " +
                                element.description,
                            locationName:
                                element.structured_formatting.main_text,
                            value: idx,
                            id: idx,
                            key: idx,
                        })
                    );
                    setItems(data);
                }
                setLoading(false);
            })
    }

  return (
        <DropDownPicker
            placeholder="Type the location ..."
            searchable={true}
            disableLocalSearch={true}
            onChangeSearchText={handleSearchTextChange}
            onSelectItem={onChange}
            loading={loading}
            open={open}
            defaultValue={initialValue}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            zIndex={zIndex}
            zIndexInverse={zIndexInverse}
        />
  );
};