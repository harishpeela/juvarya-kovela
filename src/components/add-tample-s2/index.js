import {View} from 'react-native';
import React from 'react';
import {InputField, PrimaryButton} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {allTexts, colors} from '../../common';
import {Formik} from 'formik';
import {AddTampleSchemaS2} from '../../common/schemas';
import {styles} from './styles';

export const AddTampleStep2 = ({onNextBtnPress, data}) => {
  const {
    buttonTexts: {next},
    placeHolders: {pincodeP, line1P, line2P, line3P},
    headings: {
      inputTitles: {pinCode, line2, line1, line3},
    },
  } = allTexts;

  return (
    <View style={styles.wrapper}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.keyBoardStyle}
        contentContainerStyle={styles.scrollContainer}>
        <Formik
          onSubmit={(values, formikActions) => {
            onNextBtnPress(values, formikActions);
          }}
          validationSchema={AddTampleSchemaS2}
          initialValues={{
            pinCode: data.pinCode,
            line1: data.line1,
            line2: data.line2,
            line3: data.line3,
          }}>
          {({
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            values,
          }) => {
            return (
              <View style={styles.fieldContainer}>
                <InputField
                  value={values.pinCode}
                  title={pinCode}
                  titleColor={colors.green}
                  placeholder={pincodeP}
                  error={touched.pinCode && errors.pinCode}
                  onBlur={handleBlur('pinCode')}
                  setState={handleChange('pinCode')}
                  keyboardType={'numeric'}
                />
                <View style={{height: 20}} />
                <InputField
                  value={values.line1}
                  title={line1}
                  titleColor={colors.green}
                  placeholder={line1P}
                  error={touched.line1 && errors.line1}
                  onBlur={handleBlur('line1')}
                  setState={handleChange('line1')}
                />
                <View style={{height: 20}} />
                <InputField
                  value={values.line2}
                  title={line2}
                  titleColor={colors.green}
                  placeholder={line2P}
                  error={touched.line2 && errors.line2}
                  onBlur={handleBlur('line2')}
                  setState={handleChange('line2')}
                />

                <View style={{height: 20}} />

                <InputField
                  value={values.line3}
                  title={line3}
                  titleColor={colors.green}
                  placeholder={line3P}
                  error={touched.line3 && errors.line3}
                  onBlur={handleBlur('line3')}
                  setState={handleChange('line3')}
                />
                <View style={styles.buttonContainer}>
                  <PrimaryButton
                    bgColor={colors.blue3}
                    onPress={handleSubmit}
                    text={next}
                    radius={8}
                    fontsize={10}
                    padding={8}
                  />
                </View>
              </View>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
};
