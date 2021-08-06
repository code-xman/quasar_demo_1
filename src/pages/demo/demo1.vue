<!-- Created by xj on 2021-04-28. demo1 -->
<template>
  <div class="column">
    <base-form
      class="col overflow-auto"
      ref="baseForm"
      :formObj="formObj"
      @valChange="valChange"
      @filterFn="filterFn"
    ></base-form>
    <bottom-btn :btnList="btnList" @btnClick="btnClick"></bottom-btn>
  </div>
</template>
<script>
import { ref, reactive } from "@vue/composition-api";
import baseForm from "src/publicComponents/baseForm";
import bottomBtn from "src/publicComponents/bottomBtn";
import {notify} from 'src/utils/index'
export default {
  name: "demo1",
  components: { baseForm, bottomBtn },
  setup() {
    const baseForm = ref(null)
    const selectOptions = ref(null)

    const validateFn = (val) => {
      console.log('val :>> ', val);
      return new Promise ((resolve, reject) => {
        setTimeout(() => {
          resolve(!!val || '该项必填')
        }, 1000);
      })
    }

    const formObj = reactive({
      list: [
        {
          tag: "q-input",
          name: "input",
          label: "输入框",
          optionObj: {
            clearable: true,
            clearIcon: "close",
            mask: "##/##",
            fillMask: "*"
          }
        },
        {
          tag: "q-select",
          name: "select",
          label: "下拉框",
          optionObj: {
            emitValue: true,
            mapOptions: true,
            options: [
              {
                label: "选项一",
                value: "1"
              },
              {
                label: "选项二",
                value: "2"
              }
            ]
          }
        },
        {
          tag: "input-date",
          name: "inputDate",
          label: "日期框"
        },
        {
          tag: "q-input",
          name: "number",
          label: "数字框",
          optionObj: {
            type: "number"
          }
        },
        {
          tag: "q-input",
          name: "time",
          label: "时间框",
          optionObj: {
            type: "time"
          }
        },
        {
          tag: "q-input",
          name: "date",
          label: "日期框",
          optionObj: {
            type: "date"
          }
        },
        {
          tag: "input-money",
          name: "money",
          label: "金额框",
          optionObj: {
            clearable: true,
            clearIcon: "close",
            type: "money"
          }
        },
        {
          tag: "input-money",
          name: "money1",
          label: "没有可清除的金额框",
          optionObj: {
            clearable: false,
            type: "money1"
          }
        },
        {
          tag: "q-input",
          name: "validate",
          label: "验证框",
          rules: [val => !!val || '该项必填']
        },
        {
          tag: "q-input",
          name: "validateFn",
          label: "异步验证框",
          rules: [validateFn],
          optionObj: {
            debounce: '500'
          }
        },
        {
          tag: "q-select",
          name: "selectLazy",
          label: "下拉框Lazy",
          optionObj: {
            emitValue: true,
            mapOptions: true,
            options: selectOptions.value
          },
          events: {
          }
        },
        {
          tag: "q-input",
          name: "textarea",
          label: "文本框",
          col: "col-12",
          optionObj: {
            outlined: true,
            type: "textarea"
          }
        }
      ],
      valueObj: {
        input: "",
        select: "",
        inputDate: "",
        time: "",
        date: "",
        money: "",
        money1: "",
        validate: '',
        validateFn: '',
        number: "",
        selectLazy: ''
      },
      validateRes: true
    });

    const btnList = ref( [
      {
        label: "保存",
        type: "save",
        color: "primary",
        textColor: "white"
      },
      {
        label: "延迟1s",
        loading: false,
        type: "delay"
      },
      {
        label: "获取数据",
        loading: false,
        type: "getData"
      }
    ]);

    const filterFn = ({name, val, update, abort}) => {
      if (formObj.list.find(item => item.name === name).optionObj.options !== null) {
        // already loaded
        update()
        return
      }

      setTimeout(() => {
        update(() => {
          formObj.list.find(item => item.name === name).optionObj.options = [
            {
              label: "选项A",
              value: "A"
            },
            {
              label: "选项B",
              value: "B"
            }
          ]
        })
      }, 2000);
    }

    function valChange(name, val) {
      formObj.valueObj[name] = val;
    }

    function btnClick(type) {
      switch (type) {
        case "getData":
          console.log("formObj.valueObj :>> ", formObj.valueObj);
          break;

        case 'delay':
          btnList.value.find(item => item.type === 'delay').loading = true
          setTimeout(() => {
            console.log('延迟1s');
            btnList.value.find(item => item.type === 'delay').loading = false
          }, 1000);
          break
        case 'save':
          btnList.value.find(item => item.type === 'save').loading = true
          baseForm.value.$refs.aForm.validate().then((val) => {
            btnList.value.find(item => item.type === 'save').loading = false
            formObj.validateRes = val
            if (!formObj.validateRes) {
              notify({
                type: 'negative',
                message: '填写有误'
              })
              return
            }
            notify({
              type: 'positive',
              message: '保存成功'
            })
          })
          break

        default:
          break;
      }
    }

    return {
      baseForm,
      btnList,
      formObj,
      valChange,
      btnClick,
      filterFn
    };
  }
};
</script>
<style lang="scss" scoped></style>
