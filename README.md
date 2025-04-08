根据你提供的 GitHub 地址，下面是更新后的 `README.md` 文件：

```markdown
# musicxml2json-drum

`musicxml2json-drum` 是一个用于将 MusicXML 格式的乐谱文件转换为 JSON 格式的工具，专为打击乐器（如鼓）乐谱的转换而设计。它可以帮助开发者将 MusicXML 数据转换成易于处理和操作的 JSON 格式，以便于进一步的分析、渲染或存储。

## 安装

你可以通过 npm 或 yarn 安装 `musicxml2json-drum`：

```bash
npm install musicxml2json-drum
```

或者：

```bash
yarn add musicxml2json-drum
```

## 使用

### 基本用法

1. 导入 `musicxml2json-drum`：

```javascript
import { parseMusicXML } from 'musicxml2json-drum';
```

2. 使用 `parseMusicXML` 函数将 MusicXML 字符串转换为 JSON 数据：

```javascript
const xmlStr = `<?xml version="1.0" encoding="UTF-8"?><musicxml>...</musicxml>`;

const jsonData = parseMusicXML(xmlStr);
console.log(jsonData);
```

### 配置选项

你可以传递配置参数来定制转换过程。可用的配置选项包括：

- `debug` (可选): 如果设置为 `true`，将输出调试信息。
- `speed` (可选): 用于指定音乐的速度，单位为每分钟拍数 (BPM)。
- `instrumentConfig` (必填): 一个包含乐器配置信息的对象。

```javascript
const config = {
  debug: true,
  speed: 120,
  instrumentConfig: {
    36: { code: 36, name: 'Kick', value: [36], index: 0 },
    37: { code: 37, name: 'Snare', value: [37], index: 1 },
    38: { code: 38, name: 'Snare', value: [38, 125], index: 2 },
    42: { code: 42, name: 'Hi-Hat', value: [22, 42], index: 3 }
  }
};

const jsonData = parseMusicXML(xmlStr, config);
```

### 可用函数

- `parseMusicXML(xmlStr: string, config: PropsType): MusicData`: 解析 MusicXML 字符串并返回转换后的 JSON 数据。

### 获取乐器和音符数据

你可以通过提供的 API 获取指定乐器和音符的数据：

- `getMeasureById(id: string)`: 根据小节 ID 获取小节信息。
- `getNoteById(id: string)`: 根据音符 ID 获取音符信息。

```javascript
const measure = parser.getMeasureById('M_1');
const note = parser.getNoteById('N_1');
```

## 文档

[完整 API 文档](https://hezhiyi.com/docs/zh/musicxml2json-drum/guide/)

## GitHub

[GitHub 仓库](https://github.com/gzzhiyi/musicxml2json-drum.git)

## License

MIT