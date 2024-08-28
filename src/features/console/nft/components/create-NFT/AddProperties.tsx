import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import styles from './AddProperties.module.scss';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import Modal from '@/features/console/common/Modal';
import { NFTAttributeType } from '@/features/console/nft/stores/CreateNFTStore';

interface AddPropertiesProps {
  setShowAddProperties: () => void;
}

const AddProperties = observer(
  ({ setShowAddProperties }: AddPropertiesProps) => {
    const { createNFTStore: store } = useStore();
    const [isFocus, setIsFocus] = useState(false);
    const [property, setProperty] = useState<NFTAttributeType>();
    const [properties, setProperties] = useState<NFTAttributeType[]>([]);

    useEffect(() => {
      if (store.attributes) {
        setProperties(store.attributes);
      }
    }, [store]);

    return (
      <Modal
        onClose={() => setShowAddProperties()}
        header={'Add Properties'}
        content={
          <div className={`addProperties ${styles.addProperties}`}>
            <table>
              <colgroup>
                <col style={{ width: 247 }} />
                <col style={{ width: 247 }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr className={isFocus ? 'focus' : ''}>
                  <td>
                    <input
                      type="text"
                      value={property?.type ?? ''}
                      onChange={(e) =>
                        setProperty((prev) => {
                          return { ...prev, type: e.target.value };
                        })
                      }
                      placeholder="E.g. Character"
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={property?.value ?? ''}
                      onChange={(e) =>
                        setProperty({ ...property, value: e.target.value })
                      }
                      placeholder="E.g. Character"
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        property &&
                          setProperties(
                            properties ? [...properties, property] : [property]
                          );
                        setProperty(undefined);
                      }}
                      disabled={!property?.type || !property?.value}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <ul className="properties">
              {properties?.map((property, i) => {
                return (
                  <li key={`${property.value}${i}`}>
                    <div className="type">{property.type}</div>
                    <div className="name">{property.value}</div>
                    <button
                      onClick={() =>
                        setProperties(properties.filter((f) => property !== f))
                      }
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        }
        footer={
          <SolidButton
            size="small"
            styleType="color"
            label="Save"
            disabled={!properties || properties?.length < 1}
            onClick={() => {
              store.handleProperties(properties);
              setShowAddProperties();
            }}
          />
        }
      />
    );
  }
);

export default AddProperties;
