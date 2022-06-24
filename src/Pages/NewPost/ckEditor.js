import React, { useEffect, useRef } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Editor({ onChange, name, value }) {
  return (
    <div>
      <CKEditor
        type=""
        name={name}
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}

export default Editor;
