import React, {forwardRef, useRef, useImperativeHandle, useState} from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Dimensions } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import storage from '@react-native-firebase/storage';
import {htmlToText} from 'html-to-text'

const App = forwardRef((props, ref) => {
  const _editor = React.createRef();

  const [length, setLength] = useState(0)
  const windowHeight = Dimensions.get('window').width;

  useImperativeHandle(ref, () => ({

    async getAlert(uri, name, firebasePath){
      const imageRef = storage().ref(`${firebasePath}/${name}`)
      await imageRef.putFile(uri, { contentType: 'image/jpg'}).catch((error) => { throw error })
      const url = await imageRef.getDownloadURL().catch((error) => { throw error });
      _editor.current.insertEmbed(length, 'image', url);
    }

  }));

  return (
    <SafeAreaView style={[styles.root]}>
      <StatusBar style="auto" />
      <QuillEditor
          style={styles.editor}
          ref={_editor}
          initialHtml={props.content}
          onHtmlChange={({html}) => {
                str = htmlToText(html, {trimEmptyLines: true})
                while (str.indexOf('\n\n') > -1){
                  str=str.replace('\n\n', '\n');
                }
                console.log(str.length)
                // alert(html)
                if(str.length > 1){
                  props.setTrue()
                }else{
                  props.setFalse()
                }
                props.onChange(html)
            }}
            onSelectionChange={({ range: { index, lengthmber }}) => setLength(index)}
        />
      <QuillToolbar editor={_editor} options="full" theme="light" />
    </SafeAreaView>
  );
})

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  root: {
    flex: 1,
    backgroundColor: '#eaeaea',
    marginBottom: 25
  },
  editor: {
    flex: 1,
    borderColor: 'gray',
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: 'white',
  },
});

export default App