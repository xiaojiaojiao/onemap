<template>
  <div style="text-align:center">
     <a-space>
    <a-spin size="small" />
    <a-spin />
    <a-spin size="large" />
  </a-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { getSmsCaptcha } from '@/api/user/login';
import type { TabsProps } from 'ant-design-vue';
import { message, notification, Form } from 'ant-design-vue';
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons-vue';

import { useRoute, useRouter } from 'vue-router';
import type { RequestError } from '@/utils/request';
import { useUserStore } from '@/store/user';

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore();
    const state = reactive({
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,

      time: 60,
      smsSendBtn: false,
    });

    const handleUsernameOrEmail = (_rule: any, value: any) => {
      return new Promise(resolve => {
        const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if (regex.test(value)) {
          state.loginType = 0;
        } else {
          state.loginType = 1;
        }
        resolve(state.loginType);
      });
    };
    const modelRef = reactive({
      rememberMe: true,
      username: '',
      password: '',
      mobile: '',
      captcha: '',
    });
    const rulesRef = reactive({
      rememberMe: undefined,
      username: [
        { required: true, message: '请输入帐户名或邮箱地址', type: 'string' },
        { validator: handleUsernameOrEmail, trigger: 'change' },
      ],
      password: [
        { required: true, message: '请输入密码', type: 'string', trigger: ['blur', 'change'] },
      ],
      mobile: [
        {
          required: true,
          // pattern: /^1[34578]\d{9}$/,
          message: '请输入正确的手机号',
          trigger: ['blur', 'change'],
        },
      ],
      captcha: [{ required: true, message: '请输入验证码' }],
    });
    const { validateInfos, validate, resetFields } = Form.useForm(modelRef, rulesRef);

    const handleTabClick: TabsProps['onChange'] = key => {
      state.customActiveKey = key as string;
      resetFields();
    };

    const requestFailed = (err: RequestError) => {
      state.isLoginError = true;
      notification.error({
        message: '错误',
        description: ((err.response || {}).data || {}).errorMessage || '请求出现错误，请稍后再试',
        duration: 4,
      });
    };

    const loginSuccess = () => {
      router.push(decodeURIComponent((route.query?.redirect as string) || '') || '/');
      // // 延迟 1 秒显示欢迎信息
      // setTimeout(() => {
      //   notification.success({
      //     message: '欢迎',
      //     description: '欢迎回来',
      //   });
      // }, 1000);
      state.isLoginError = false;
    };

    const getCaptcha = (e: Event) => {
      e.preventDefault();

      validate('mobile')
        .then(values => {
          state.smsSendBtn = true;

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60;
              state.smsSendBtn = false;
              window.clearInterval(interval);
            }
          }, 1000);

          const hide = message.loading('验证码发送中..', 0);
          getSmsCaptcha({ mobile: values.mobile })
            .then(res => {
              setTimeout(hide, 2500);
              notification.success({
                message: '提示',
                description: '验证码获取成功，您的验证码为：' + res.captcha,
                duration: 8,
              });
            })
            .catch(err => {
              setTimeout(hide, 1);
              clearInterval(interval);
              state.time = 60;
              state.smsSendBtn = false;
              requestFailed(err);
            });
        })
        .catch(err => {
          console.log('err', err);
        });
    };
    const handleSubmit = () => {
      // e.preventDefault();
      // const validateNames =
      //   state.customActiveKey === 'tab1' ? ['username', 'password'] : ['mobile', 'captcha'];
      // state.loginBtn = true;
      // validate(validateNames)
        // .then(values => {
          debugger;
          const values = {
            password:'admin',
            username: 'admin',
          };
          console.log('values', values);
          userStore
            .LOGIN({
              ...values,
              type:true,
            })
            .then(() => {
              loginSuccess();
            });
            // .catch(err => {
            //   requestFailed(err);
            // })
            // .finally(() => {
            //   state.loginBtn = false;
            // });
        // })
        // .catch((/*err*/) => {
          // 屏蔽错误处理
          // requestFailed(err);
          // state.loginBtn = false;
        // });
    };
    handleSubmit();

    // const handleSubmit = (e: Event) => {
    //   e.preventDefault();
    //   const validateNames =
    //     state.customActiveKey === 'tab1' ? ['username', 'password'] : ['mobile', 'captcha'];
    //   state.loginBtn = true;
    //   validate(validateNames)
    //     .then(values => {
    //       console.log('values', values);
    //       userStore
    //         .LOGIN({
    //           ...values,
    //           type: state.customActiveKey === 'tab1',
    //         })
    //         .then(() => {
    //           loginSuccess();
    //         })
    //         .catch(err => {
    //           requestFailed(err);
    //         })
    //         .finally(() => {
    //           state.loginBtn = false;
    //         });
    //     })
    //     .catch((/*err*/) => {
    //       // 屏蔽错误处理
    //       // requestFailed(err);
    //       state.loginBtn = false;
    //     });
    // };

    return {
      ...toRefs(state),
      modelRef,
      validateInfos,

      handleTabClick,
      handleSubmit,
      getCaptcha,
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
    MobileOutlined,
    MailOutlined,
    AlipayCircleOutlined,
    TaobaoCircleOutlined,
    WeiboCircleOutlined,
  },
});
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    width: 100%;
    height: 40px;
    padding: 0 15px;
    font-size: 16px;
  }

  .user-login-other {
    margin-top: 24px;
    line-height: 22px;
    text-align: left;

    .item-icon {
      margin-left: 16px;
      color: @disabled-color;
      font-size: 24px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: @primary-color;
      }
    }

    .register {
      float: right;
    }
  }
  .prefixIcon {
    color: @primary-color;
    font-size: @font-size-base;
  }
}
.user-layout-login :deep(.ant-tabs) {
  .ant-tabs-nav::before {
    border-bottom: none;
  }
}
</style>
