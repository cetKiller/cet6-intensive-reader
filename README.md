# CET6 精读工作台

一个面向六级阅读精读的静态网站。覆盖 2024-2026 年共 15 套卷、60 个阅读篇章，包含：

- 套卷书架与年份筛选
- 选词填空、段落匹配、仔细阅读三种阅读路径
- 逐句原文与精编译文
- 重点词卡、生词本与本地笔记
- 所有行内标注词和短语都可点击查看词卡
- 60 篇共 274 条长难句主干、结构拆解和阅读顺序
- 段落匹配草稿与仔细阅读证据定位
- 桌面与移动端响应式布局

## 本地运行

```powershell
cd D:\my-first-llm\cet6-reader
python -m http.server 4173 --bind 127.0.0.1
```

打开 `http://127.0.0.1:4173/`。

## 内容来源

试卷原文由 `scripts/extract_pdfs.py` 从以下目录的 15 份 PDF 中提取：

```text
D:\浏览器下载\cet6\cte6
```

重新生成试卷数据：

```powershell
C:\Users\asus\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe scripts\extract_pdfs.py
```

生成文件为 `data/papers.js`。原始 PDF 未复制进项目。

## 翻译内容

`data/curated.js` 保存人工精编内容。“2025 年 6 月第一套 · 仔细阅读 Passage One”具备完整的 25 句精编译文、重点词、长难句和篇章结构。

其余 59 篇的逐句译文保存在 `data/translations.js`，全部 60 个阅读页面都可以使用译文显示与隐藏功能。

59 篇待译文章还经过第二轮译文精修和六级词汇标注，标注数据保存在 `data/annotations.js`。当前共 60 篇、1458 个行内标注，包括重点词、熟词僻义、逻辑词和固定搭配。

批量生成或补跑译文：

```powershell
D:\my-first-llm\.venv\Scripts\python.exe scripts\translate_papers.py
```

脚本会读取根目录 `.env` 中的 `DEEPSEEK_API_KEY`，跳过已有缓存，并按原文段落和句子数量校验译文。

批量精修译文并生成六级标注：

```powershell
D:\my-first-llm\.venv\Scripts\python.exe scripts\enhance_papers.py
```

标注会校验每个英文短语是否在原文字符串中真实存在；页面渲染阶段还会再按句子匹配，未落位的标注不会混入译文。

批量生成长难句分析：

```powershell
D:\my-first-llm\.venv\Scripts\python.exe scripts\analyze_long_sentences.py
```

生成结果保存在 `data/long-sentences.js`。每条分析都绑定到原文的段落和句子索引，点击正文中的“长难句”标记即可在底部分析坞查看。

## 本地数据

以下学习数据保存在浏览器 `localStorage`：

- 阅读进度
- 生词本
- 句子笔记
- 选词填空草稿
- 段落匹配草稿
