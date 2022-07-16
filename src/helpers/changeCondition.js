/**
 * các hàm để chuyển 
 */
const checkCondition = {
    select: condition => {
        if (typeof condition != 'object') return;
        const keys = Object.keys(condition);
        let cdnStr;      
        cdnStr = keys.map((key, _ind) => `${key}=?`).join(' and ');         
        let outStr = ! cdnStr? '': `WHERE ${cdnStr}`
        return {
            sqlStr: outStr, // câu lệnh where
            condition: Object.values(condition)
        }
    },
    insert: post => {
        
        let fields = Object.keys(post);
        let values = Object.values(post);
        let sqlStr = fields.map(item => '?').join(',');
        return {
            fields: fields,
            values: values,
            sqlStr: sqlStr
        }
    },
    update: post => {
        /**
         * tạo câu lệnh update sql
         */
        /**
         * { key: {childKey1: value1, childkey2: value 2 }
         *   field: value,
         *   field: value
         * }
         */
        let { keys, ...fields } = post;
        let WhereSQL = Object.entries(keys).map(key => `${key[0]}=${key[1]}`).join(' and ');
        let updateSQL = Object.entries(fields).map(field => `${field[0]}='${field[1]}'`).join(','); 
        return {
            WhereSQL: WhereSQL,
            updateSQL: updateSQL,
        }
    },
    where: conditions => {
        let whereSQL = Object.entries(conditions).map(cdn => `${cdn[0]}=${cdn[1]}`).join(' and ');
        return {
            whereSQL:whereSQL
        }
    }
}

export default checkCondition;
