import { defineMiddleware } from 'tap'
import { z } from 'zod'

import { IFormSchemaContext } from '../type'

// 动态注入amount字段的rules
export const AddAmountRules = () => {
  return defineMiddleware<IFormSchemaContext>((ctx, next) => {
    ctx.data.schema?.forEach((item) => {
      // 验证产品定价
      if (item.fieldName === 'amount') {
        const [min, max] = item.range ?? [9, 100]
        item.rules = z
          .string()
          .refine(
            (val: any) => !Number.isNaN(val) && val >= min && val <= max,
            {
              message: `请输入${min}~${max}之间的数字`,
            },
          )
      }
    })
    next()
  })
}
