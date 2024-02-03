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
			i: {
				j: 1,
				h: {
					nameZh: '中文',
					nameEn: 'English',
					nameJa: '日语',
				}
			}
		}
	},
};
type JsonObject<T extends Record<string, unknown>> = {
	[key in keyof T]: T[key] extends Record<string, unknown> ? JsonObject<T[key]> : T[key];
}
const result: Record<string, object> = {};

const language = ["Zh", "En", "Ja"];
const currentLanguage = "Zh";
function conversion<T extends Record<string, object>>(obj: T, target = result) {
	// 1. 遍历所有key
	for (const key in obj) {
		// 2.判断key是否以Zh、En、Ja结尾
		if (key.endsWith("Zh") || key.endsWith("En") || key.endsWith("Ja")) {
			// 3.获取key对应的值,并赋值
			// 截断后面的Zh、En、Ja
			const newKey = key.substring(0, key.length - 2);
			target[newKey] = obj[newKey + currentLanguage];
			continue;
		}
		// 判断值是否为object
		if (typeof obj[key] === "object") {
			// 4.递归
			target[key] = { ...target[key] };
			conversion(obj[key] as unknown as T, target[key] as unknown as T);
		} else {
			// 普通数据直接复制
			target[key] = obj[key];
		}
	}
}

conversion(data);




function conversionData<T extends Record<string, unknown> | Array<Record<string, unknown>>>(obj: T, target: T) {
	// 1. 判断是否是数组
	if (Array.isArray(obj)) {
		console.log("是数组");
		// 遍历数组
		for (let i = 0; i < obj.length; i++) {
			// 判断是否是数组
			if (Array.isArray(obj[i])) {
				conversionData(obj[i] as T, (target as Array<Record<string, unknown>>)[i] as T);
			}
		}
	}

	// 判断是否是object
	if (typeof obj === "object") {
		// 2. 遍历所有key
		for (const key in obj) {
			// 2.判断key是否以Zh、En、Ja结尾
			if (key.endsWith("Zh") || key.endsWith("En") || key.endsWith("Ja")) {
				// 3.获取key对应的值,并赋值
				// 截断后面的Zh、En、Ja
				const newKey = key.substring(0, key.length - 2);
				// 判断是否有父级key
				(target as Record<string, unknown>)[newKey] = (obj as Record<string, unknown>)[newKey + currentLanguage];
				continue;
			}
			if (typeof obj[key] === "object") {
				// 4.递归
				// 判断值是否为object
				target[key] = { ...target[key] };
				conversionData(obj[key] as T, target[key] as T);
			} else {
				// 普通数据直接复制
				target[key] = obj[key];
			}
		}
	}
}

const data2 = [{
	a: 1,
	b: {
		nameZh: "中文",
		nameEn: "English",
		nameJa: "日语",
		info:{
			displayNameZh: "中文",
			displayNameEn: "English",
			displayNameJa: "日语",
		},
		data: 2
	}
},
{
	a: 2,
	b: {
		nameZh: "中文2",
		nameEn: "English2",
		nameJa: "日语2",
		data: 22
	}
}]
const result2 = [{}];
conversionData(data2, result2);

console.log(result2[0]);