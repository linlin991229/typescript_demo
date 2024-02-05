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

type JsonData = Record<string, unknown>;

function convertData(data: JsonData | JsonData[], target: JsonData | JsonData[]) {
    // 判断data是否是数组
    if (Array.isArray(data)) {
      // 如果target是响应式对象，转为非响应式对象
      // 是数组对每一个元素进行处理
      if (result.value === target) {
        (result.value as JsonData[]) = target = [];
      } else {
        target = [];
      }
      for (let i = 0; i < data.length; i++) {
        // 为result增加一个元素长度
        target = target as unknown as JsonData[];

        // 增加一个元素，用于存储下一个对象的数据
        target.push({});
        // 递归调用
        convertData(data[i], target[i]);
      }
    } else if (typeof data === 'object') {
      // 是对象
      for (const key in data) {
        // 为target增加一个key
        target = target as unknown as JsonData;
        // 判断该key是否是i18n数据的key
        if (key.endsWith('Zh') || key.endsWith('En') || key.endsWith('Ja')) {
          // 是i18n数据的key
          // 截取i18n数据的key为新的key
          const newKey = key.slice(0, -2);
          // 为result增加一个key
        //   target[newKey] = data[newKey + suffix.value];
          // 已经处理完当前key,结束当前循环
          continue;
        }
        if (typeof data[key] === 'object') {
          // 递归调用
          target[key] = { ...(target[key] as object) };
          convertData(data[key] as JsonData | JsonData[], target[key] as JsonData | JsonData[]);
        } else {
          // 普通数据直接赋值
          target[key] = data[key];
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

console.log(result2[0]);