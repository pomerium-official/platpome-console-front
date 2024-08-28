import React, { Component } from 'react';
// TODO proptypes 걷어내기
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CSS from 'csstype';

interface EditorTextChangeParams {
  htmlValue: string | null;
  textValue: string;
  delta: any;
  source: string;
}

interface EditorSelectionChangeParams {
  range: any;
  oldRange: any;
  source: string;
}

export interface EditorProps {
  id?: string;
  value?: string;
  style?: CSS.Properties;
  className?: string;
  placeholder?: string;
  readOnly?: boolean;
  /***
   * 자동숨김 기능 boolean
   */
  autoHide?: boolean;
  /**
   * quill modules
   */
  modules?: any;
  formats?: string[];
  theme?: string;
  headerTemplate?: React.ReactNode;
  onTextChange?(e: EditorTextChangeParams): void;
  onSelectionChange?(e: EditorSelectionChangeParams): void;
  onLoad?(quill: any): void;
  /**
   * 이미지 업로드 처리 함수.
   * @param file 업로드할 파일
   * @return {Promise<string>} imageUrl 이미지 태그의 src에 들어갈 url. 실제 서버에 업로드 된 후 볼 수 있는 url. <img src={imageUrl}/>
   */
  uploadImage?(file: File): Promise<string>;

  /**
   * 최대 길이
   */
  maxLength?: number;
}

let ImageUploader: any;
let QuillModule: any;

export class Editor extends Component<EditorProps> {
  static defaultProps = {
    id: null,
    value: null,
    style: null,
    className: null,
    placeholder: null,
    readOnly: false,
    modules: null,
    formats: null,
    theme: 'snow',
    headerTemplate: null,
    onTextChange: null,
    onSelectionChange: null,
    uploadImage: null,
    maxLength: null,
  };

  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    modules: PropTypes.object,
    formats: PropTypes.array,
    theme: PropTypes.string,
    headerTemplate: PropTypes.any,
    onTextChange: PropTypes.func,
    onSelectionChange: PropTypes.func,
    uploadImage: PropTypes.func,
    maxLength: PropTypes.number,
  };

  quill?: any;
  toolbarElement: HTMLDivElement | null = null;
  editorElement: HTMLDivElement | null = null;

  constructor(props: EditorProps) {
    super(props);

    if (
      typeof window !== 'undefined' &&
      typeof window.document !== 'undefined'
    ) {
      QuillModule = require('quill');
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      ImageUploader = require('./ImageUploader').default;
    }
  }

  /**
   * 최대 길이 초과시 text자르기
   * @return {boolean} 최대 길이 초과 여부
   */
  applyMaxLength() {
    if (
      this.props.maxLength !== null &&
      this.props.maxLength !== undefined &&
      this.quill &&
      this.quill.getLength() > this.props.maxLength
    ) {
      this.quill.deleteText(this.props.maxLength, this.quill.getLength());
      return true;
    }

    return false;
  }

  componentDidMount() {
    if (QuillModule === undefined) return;

    const modules = {
      toolbar: this.toolbarElement,
      ...this.props.modules,
    };

    if (this.props.uploadImage) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window['ImageUploader'] = ImageUploader;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      QuillModule.register('modules/imageUploader', ImageUploader);
      modules['imageUploader'] = {
        upload: this.props.uploadImage,
      };
    }

    this.quill = new QuillModule(this.editorElement, {
      modules: modules,
      placeholder: this.props.placeholder,
      readOnly: this.props.readOnly,
      theme: this.props.theme,
      formats: this.props.formats,
    });

    if (this.props.value) {
      this.quill.setContents(this.quill.clipboard.convert(this.props.value));
    }

    this.quill.on('text-change', (delta: any, source: any) => {
      let html: string | null =
        this.editorElement?.children[0].innerHTML ?? null;
      if (html === '<p><br></p>') {
        html = null;
      }

      const isMaxLength = this.applyMaxLength();

      if (isMaxLength) {
        this.quill.deleteText(this.props.maxLength, this.quill.getLength());
        return;
      }

      const text = this.quill.getText();

      if (this.props.onTextChange) {
        this.props.onTextChange({
          htmlValue: html,
          textValue: text,
          delta: delta,
          source: source,
        });
      }
    });

    this.quill.on(
      'selection-change',
      (range: any, oldRange: any, source: any) => {
        if (this.props.onSelectionChange) {
          this.props.onSelectionChange({
            range: range,
            oldRange: oldRange,
            source: source,
          });
        }
      }
    );
  }

  componentDidUpdate(prevProps: EditorProps) {
    if (
      this.props.value !== prevProps.value &&
      this.quill &&
      !this.quill.hasFocus()
    ) {
      if (this.props.value)
        this.quill.setContents(this.quill.clipboard.convert(this.props.value));
      else this.quill.setText('');
    }
  }

  render() {
    const containerClass = classNames(
      'p-component p-editor-container',
      this.props.className
    );
    let toolbarHeader = null;

    if (this.props.headerTemplate) {
      toolbarHeader = (
        <div
          ref={(el) => (this.toolbarElement = el)}
          className="p-editor-toolbar"
        >
          {this.props.headerTemplate}
        </div>
      );
    } else {
      toolbarHeader = (
        <div
          ref={(el) => (this.toolbarElement = el)}
          className="p-editor-toolbar"
        >
          <span className="ql-formats">
            <select className="ql-header" defaultValue="0">
              <option value="1">Heading</option>
              <option value="2">Subheading</option>
              <option value="0">Normal</option>
            </select>
            <select className="ql-font">
              <option></option>
              <option value="serif"></option>
              <option value="monospace"></option>
            </select>
          </span>
          <span className="ql-formats">
            <button
              type="button"
              className="ql-bold"
              aria-label="Bold"
            ></button>
            <button
              type="button"
              className="ql-italic"
              aria-label="Italic"
            ></button>
            <button
              type="button"
              className="ql-underline"
              aria-label="Underline"
            ></button>
          </span>
          <span className="ql-formats">
            <select className="ql-color"></select>
            <select className="ql-background"></select>
          </span>
          <span className="ql-formats">
            <button
              type="button"
              className="ql-list"
              value="ordered"
              aria-label="Ordered List"
            ></button>
            <button
              type="button"
              className="ql-list"
              value="bullet"
              aria-label="Unordered List"
            ></button>
            <select className="ql-align">
              <option></option>
              <option value="center"></option>
              <option value="right"></option>
              <option value="justify"></option>
            </select>
          </span>
          <span className="ql-formats">
            <button
              type="button"
              className="ql-link"
              aria-label="Insert Link"
            ></button>
            <button
              type="button"
              className="ql-image"
              aria-label="Insert Image"
            ></button>
            <button
              type="button"
              className="ql-code-block"
              aria-label="Insert Code Block"
            ></button>
          </span>
          <span className="ql-formats">
            <button
              type="button"
              className="ql-clean"
              aria-label="Remove Styles"
            ></button>
          </span>
        </div>
      );
    }

    const content = (
      <div
        ref={(el) => (this.editorElement = el)}
        className="p-editor-content"
        style={this.props.style}
      >
        {QuillModule === undefined && this.props.value}{' '}
      </div>
    );

    return (
      <div id={this.props.id} className={containerClass}>
        {toolbarHeader}
        {content}
      </div>
    );
  }
}
