# For server
# Usage: ./deploy.sh /path/to/your.tgz
#
# ! This sh run on server
#

File=$1

# 提取文件名
FileName=$(basename $File .tgz)

# 提取目录名
DirName=$(dirname $File)


# 定义最新版本目录
latest=$DirName/latest

# 定义目标目录
target=$DirName/$FileName


echo $latest
echo $latest

# 删除旧的目标文件
rm -rf $latest

# 1.创建目标目录
# 2.解压文件
# 3.创建软连接
mkdir -p $target &&
tar -zxvf $File -C $target &&
ln -s ./$FileName $latest

# 删除package.json
rm -f $latest/package/package.json

# 部署成功
echo "$target => $latest"
