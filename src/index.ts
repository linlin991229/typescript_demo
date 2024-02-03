const data: Record<string, object> = {
	a: {
		b: {
			nameZh: "中文",
			nameEn: "English",
			nameJa: "日语",
		},
		c: "data",
		d: {
			e: {
				descriptionZh: "描述中文",
				descriptionEn: "Description English",
				descriptionJa: "Description 日语",
			},
		},
		f: {
			g: { nameZh: "中文2", nameEn: "English2", nameJa: "日语2" },
		},
    h: {
      i:{
        j: 1,
        h:{
          nameZh : '中文',
          nameEn : 'English',
          nameJa : '日语',
        }
      }
    }
	},
};

const result: Record<string, object> = {};

const language = ["Zh", "En", "Ja"];
const currentLanguage = "Zh";
function conversion<T extends Record<string, object>>( obj: T,target=result) {
	// 1. 遍历所有key
	for (const key in obj) {
		console.log("key1", key);
		// 2.判断key是否以Zh、En、Ja结尾
		if (key.endsWith("Zh") || key.endsWith("En") || key.endsWith("Ja")) {
			// 3.获取key对应的值,并赋值
			// 截断后面的Zh、En、Ja
			const newKey = key.substring(0, key.length - 2);
			// 判断是否有父级key
			target[newKey] = obj[newKey + currentLanguage];
      continue;
		} 
		if (typeof obj[key] === "object") {
			// 4.递归
			// 判断值是否为object
      console.log("key2", key);
      target[key]={...target[key]};
			conversion(obj[key] as unknown as T,target[key] as unknown as T);
		} else {
      // 普通数据直接复制
      target[key] = obj[key];
    }
	}
}

conversion(data);

console.log(result);