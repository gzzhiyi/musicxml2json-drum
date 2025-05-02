import React, { useState, useRef, useEffect } from 'react'
import _ from 'lodash'
import ReactJson from 'react-json-view'
import { Parser } from '../../dist/index.esm.js'
import './App.css'

const configs = {
  36: { code: 36, name: 'Kick', value: [36], index: 0 },
  37: { code: 37, name: 'Snare', value: [37], index: 1 },
  38: { code: 38, name: 'Snare', value: [38, 125], index: 2 },
  42: { code: 42, name: 'Hi-Hat', value: [22, 42], index: 3 },
  43: { code: 43, name: 'Tom3', value: [43, 74], index: 4 },
  44: { code: 44, name: 'Hi-hat', value: [23, 44], index: 5 },
  45: { code: 45, name: 'Tom2', value: [45, 77], index: 6 },
  46: { code: 46, name: 'Hi-hat', value: [14, 46], index: 7 },
  48: { code: 48, name: 'Tom1', value: [48, 81], index: 1 },
  49: { code: 49, name: 'Crash', value: [27, 49], index: 2 },
  51: { code: 51, name: 'Ride', value: [51, 59], index: 2 },
  53: { code: 53, name: 'Ride', value: [51, 53], index: 2 },
  91: { code: 91, name: 'Ride', value: [40, 91], index: 3 },
  92: { code: 92, name: 'Hi-hat', value: [12, 64, 92], index: 4 }
}

export default function App() {
  const [xmlContent, setXmlContent] = useState(null)
  const [parsedData, setParsedData] = useState(null)
  const fileInputRef = useRef(null)

  function handleFileUpload(event) {
    const file = event?.target?.files?.[0] || event?.dataTransfer?.files?.[0]
    if (file && file.type === 'text/xml') {
      const reader = new FileReader()
      reader.onload = (e) => setXmlContent(e.target.result)
      reader.readAsText(file)
    } else {
      alert('Please upload a valid XML file')
    }
  }

  function handleDrop(event) {
    event.preventDefault()
    handleFileUpload(event)
  }

  useEffect(() => {
    if (xmlContent) {
      const result = new Parser({
        xmlStr: xmlContent,
        instruments: configs,
        debug: true,
        speed: 1
      })

      // 递归过滤掉所有以 _ 开头的键
      function removeUnderscoreKeys(obj) {
        if (_.isArray(obj)) {
          return obj.map(removeUnderscoreKeys)
        } else if (_.isObject(obj)) {
          return _.omitBy(_.mapValues(obj, removeUnderscoreKeys), (value, key) => key.startsWith('_'))
        }
        return obj
      }

      setParsedData(removeUnderscoreKeys(result)) // 存储解析后的 JSON
      // console.log(result.getNoteById('N_9_1'))
    }
  }, [xmlContent])

  return (
    <div>
      <div
        className="input-box"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <h1>Upload XML File</h1>
        <input type="file" accept=".xml" onChange={handleFileUpload} ref={fileInputRef} style={{ display: 'none' }} />
        <button onClick={() => fileInputRef.current.click()}>
          Select XML File
        </button>
      </div>
      {parsedData && (
        <div style={{ textAlign: 'left', marginTop: '20px' }}>
          <h2>Parsed XML:</h2>
          <ReactJson src={parsedData} theme="monokai" collapsed={2} />
        </div>
      )}
    </div>
  )
}
