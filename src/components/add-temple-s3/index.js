/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './style';
import {AddTampleSchemaS3} from '../../common/schemas';
import {InputField, PrimaryButton, InputTypeAddTemp3} from '../../components';
import {allTexts, colors} from '../../common';
import {Formik} from 'formik';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';

export const AddTampleStep3 = ({
  onAddBtnPress,
  data,
  isAllDataAvailable,
  setIsAllDataAvailable,
  onAllDataCollected,
  loading,
  onResetBtnPress,
  cardData,
}) => {
  const [isRoleSelected, setIsRoleSelected] = useState(data.role);
  const [dropDownError, setDropDownError] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [addEmp, setAddEmp] = useState('');
  console.log('pop up finish', isAllDataAvailable);
  return (
    <View style={styles.wrapper}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.keyBoardStyle}
        contentContainerStyle={styles.scrollContainer}>
        <Formik
          onSubmit={(values, formikActions) => {
            formikActions.setSubmitting(true);
            if (isRoleSelected == '') {
              setDropDownError(true);
            } else {
              // setIsAllDataAvailable(true);
              onAddBtnPress(values, isRoleSelected, () => {
                setIsAllDataAvailable(true);
              });
              console.log('Data Added successfully !');
            }
          }}
          validationSchema={AddTampleSchemaS3}
          initialValues={{
            employeId: data.employeId,
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
                  value={values.employeId}
                  title={allTexts.headings.inputTitles.addEmployeeId}
                  titleColor={colors.green}
                  error={touched.employeId && errors.employeId}
                  onBlur={handleBlur('employeId')}
                  setState={handleChange('employeId')}
                />
                <View style={styles.dropDownContianer}>
                  <SelectDropdown
                    data={['admin', 'super admin']}
                    buttonTextStyle={styles.DTextStyle}
                    defaultValue={isRoleSelected}
                    onSelect={e => {
                      setIsRoleSelected(e);
                      setDropDownError(false);
                    }}
                    buttonStyle={styles.DbuttonStyle}
                    defaultButtonText="Select Designation"
                    renderDropdownIcon={() => (
                      <View>
                        <Icon color={colors.black} size={20} name="down" />
                      </View>
                    )}
                  />
                  {dropDownError && (
                    <Text style={styles.error}>{allTexts.other.role}</Text>
                  )}
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      onResetBtnPress(() => setIsAllDataAvailable(false))
                    }
                    style={styles.reset}>
                    <Text style={styles.resetText}>{'Reset'}</Text>
                  </TouchableOpacity>
                  <View style={styles.addBtnContainer}>
                    <PrimaryButton
                      bgColor={colors.blue3}
                      onPress={handleSubmit}
                      // onPress={setIsAllDataAvailable}
                      text={'add'}
                      radius={8}
                      fontsize={10}
                      padding={8}
                      loading={loading}
                    />
                  </View>
                </View>
              </View>
            );
          }}
        </Formik>
        {isAllDataAvailable && (
          <>
            <TempleListCard name={cardData.name} id={cardData.id} />
            <View style={styles.finishcontainer}>
              <PrimaryButton
                bgColor={colors.blue3}
                radius={25}
                text={'Finish'}
                onPress={onAllDataCollected}
              />
            </View>
          </>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};
const TempleListCard = ({name, id}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.row1}>
        <View
          style={{
            backgroundColor: colors.black,
            height: 10,
            width: 10,
            borderRadius: 5,
            marginRight: 10,
          }}
        />
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={styles.row2}>
        <Text
          style={
            styles.detail
          }>{`Designation - ${allTexts.constants.roleTypes.admin}`}</Text>
      </View>
      <View style={styles.row2}>
        <Text style={styles.detail}>{`Employee ID : ${id}`}</Text>
      </View>
    </View>
  );
};
