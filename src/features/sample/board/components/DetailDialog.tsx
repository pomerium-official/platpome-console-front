import BoardBizStore from '../stores/BoardBizStore';
import React, { useCallback } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import { InputTextarea } from 'primereact/inputtextarea';
import { observer } from 'mobx-react';

export const DetailDialog = observer(({ store }: { store: BoardBizStore }) => {
  const { formStore } = store;
  const editDialogFooter = useCallback(() => {
    return (
      <>
        <Button
          label="Cancel"
          icon="pi pi-times"
          className="p-button-text"
          onClick={store.hideEdit}
        />
        <Button
          label="Save"
          icon="pi pi-check"
          className="p-button-text"
          onClick={store.save}
        />
      </>
    );
  }, [store.hideEdit, store.save]);

  return (
    <Dialog
      visible={store.visibleDetail}
      style={{ width: '450px' }}
      // header="Item Details"
      modal
      className="p-fluid"
      footer={editDialogFooter}
      onHide={store.hideEdit}
    >
      <div className="field">
        <label htmlFor="title">Title</label>
        <InputText
          id="name"
          value={formStore.item.title}
          onChange={(e) => formStore.handleChangeInput('title', e.target.value)}
          required
          //eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          className={classNames({
            'p-invalid': store.submitted && !formStore.item.title,
          })}
        />
        {store.submitted && !formStore.item.title && (
          <small className="p-invalid">Name is required.</small>
        )}
      </div>
      <div className="field">
        <label htmlFor="description">Description</label>
        <InputTextarea
          id="description"
          value={formStore.item.content ?? undefined}
          onChange={(e) =>
            formStore.handleChangeInput('content', e.target.value)
          }
          required
          rows={3}
          cols={20}
        />
      </div>
    </Dialog>
  );
});
