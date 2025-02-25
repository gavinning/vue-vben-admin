# 接收文件名
filename=$1

# 定义新的文件名
new_name="admin"

# 生成新的文件名，保留版本号和后缀
new_filename="${new_name}-${filename#*-*-}"

# 创建缓存目录
mkdir -p .cache

# 定义目标文件
target=".cache/$new_filename"

# 删除旧的目标文件
rm -f $target
pwd

# 移动文件到目标文件
mv $filename $target

# 打包成功
echo "pack $target success"
