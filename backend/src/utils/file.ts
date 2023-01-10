import fs from 'fs'

// 删除文件夹
export const delFolder = (path: string) => {
  let files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path) as any
    files.forEach((file: any) => {
      const curPath = path + '/' + file
      if (fs.statSync(curPath).isDirectory()) {
        delFolder(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

// 创建文件夹
export const createFolder = (baseExportPath: string, folderName: string) => {
  if (!fs.existsSync(baseExportPath)) {
    fs.mkdirSync(baseExportPath)
  }
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName)
  }
}

// 写文件
export const writeFile = async (filePath: string, content: any) => {
  const folders = filePath.split('/')
  folders.pop()
  const path = folders.join('/')
  await ensurePathExit(path)
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, function (err) {
      if (err) {
        console.log('文件写入失败' + err.message)
        reject(err.message)
      } else {
        resolve(true)
      }
    })
  })
}

// 读文件，没有的时候创建
export const readFile = async (filePath: string, defaultContent: string) => {
  const folders = filePath.split('/')
  folders.pop()
  const path = folders.join('/')
  await ensurePathExit(path)
  if (!fs.existsSync(filePath)) {
    await writeFile(filePath, defaultContent)
  }
  return fs.readFileSync(filePath, 'utf-8')
}

/**
 * 确保路径存在，没有则自动创建文件夹
 * @param savePath 路径
 * @return {Promise<void>}
 */
export async function ensurePathExit (savePath: string) {
  // 递归创建文件夹创建文件夹
  const paths = savePath.split('/')
  let exitPath = ''
  paths.forEach(function (eachPath) {
    exitPath += eachPath + '/'
    if (!fs.existsSync(exitPath)) {
      fs.mkdirSync(exitPath)
    }
  })
}
