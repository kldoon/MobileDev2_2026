import { Button, CheckBox, Input } from "@rneui/themed";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useState } from "react";
import { useSQLiteContext } from 'expo-sqlite';

import { INITIAL_FORM } from "../../data/constants";
import { ValidationError } from "yup";
import signupSchema from "../../utils/schemas/signup";
import { addUser } from "../../services/user.service";

const SignupForm = () => {
  const db = useSQLiteContext();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const submit = async () => {
    setErrors({});
    try {
      const value = await signupSchema.validate(form, { abortEarly: false });
      const userToAdd = { ...value, dob: value.dob.toISOString() };
      await addUser(db, userToAdd);
      Alert.alert('Success', 'User added successfully!');
      setForm(INITIAL_FORM);
      setErrors({});
    } catch (error) {
      if (error instanceof ValidationError) {
        const errorsObject = {};
        error.inner.forEach(err => {
          errorsObject[err.path] = err.message;
        });
        setErrors(errorsObject);
      } else {
        // Handle other errors (e.g., from addUser)
        Alert.alert('Error', error.message || 'An error occurred.');
      }
    }
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setErrors({});
  };

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error for this field on change
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <View style={styles.container}>
      <Text
        accessible={true}
        accessibilityRole="header"
        style={styles.header}
      >
        Signup Form
      </Text>
      <View style={styles.row}>
        <Input
          accessible={true}
          accessibilityLabel="First Name"
          placeholder="First Name"
          value={form.firstName}
          onChangeText={(text) => updateForm('firstName', text)}
          errorMessage={errors.firstName}
        />
      </View>
      <View style={styles.row}>
        <Input
          accessibilityLabel="Last Name"
          placeholder="Last Name"
          value={form.lastName}
          onChangeText={(text) => updateForm('lastName', text)}
          errorMessage={errors.lastName}
        />
      </View>
      <View style={styles.row}>
        <Input
          placeholder="Email"
          accessibilityLabel="Email"
          value={form.email}
          onChangeText={(text) => updateForm('email', text)}
          keyboardType="email-address"
          errorMessage={errors.email}
        />
      </View>
      <View style={styles.row}>
        <Input
          placeholder="Mobile Number"
          value={form.mobile}
          onChangeText={(text) => updateForm('mobile', text)}
          keyboardType="phone-pad"
          errorMessage={errors.mobile}
        />
      </View>
      <View style={styles.row}>
        <Input
          secureTextEntry={true}
          placeholder="Password"
          value={form.password}
          onChangeText={(text) => updateForm('password', text)}
          errorMessage={errors.password}
        />
      </View>
      <View style={styles.row}>
        <Input
          secureTextEntry={true}
          placeholder="Verify Password"
          value={form.confirmPassword}
          onChangeText={(text) => updateForm('confirmPassword', text)}
          errorMessage={errors.confirmPassword}
        />
      </View>
      <TouchableOpacity
        style={styles.row}
        accessibilityLabel="Date of birth"
        onPress={() => setShowDatePicker(true)}
      >
        <Text>Date of Birth:</Text>
        <Text>{form.dob.toDateString()}</Text>
      </TouchableOpacity>
      <View style={styles.genderRow}>
        <Text>Gender</Text>
        <CheckBox
          checked={form.gender === 0}
          onPress={() => updateForm('gender', 0)}
          checkedIcon={<MaterialCommunityIcons name="checkbox-marked" size={22} color="blue" />}
          uncheckedIcon={<MaterialCommunityIcons name="checkbox-outline" size={22} color="gray" />}
          title="Male"
          accessibilityRole="checkbox"
        />
        <CheckBox
          checked={form.gender === 1}
          onPress={() => updateForm('gender', 1)}
          checkedIcon={<MaterialCommunityIcons name="checkbox-marked" size={22} color="blue" />}
          uncheckedIcon={<MaterialCommunityIcons name="checkbox-outline" size={22} color="gray" />}
          title="Female"
          accessibilityRole="checkbox"
        />
      </View>
      <View style={styles.row}>
        <Button
          title="Submit"
          onPress={submit}
          accessibilityLabel="Save"
        />
        <Button
          title="Cancel"
          type="outline"
          onPress={resetForm}
          accessibilityLabel="Cancel"
          accessibilityHint="This will clear all inputs in the form"
        />
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={form.dob}
          mode="date"
          display="default"
          onChange={(_, selectedDate) => {
            const currentDate = selectedDate || form.dob;
            setShowDatePicker(false);
            updateForm('dob', currentDate);
          }}
        />
      )}
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 16,
    alignItems: "stretch"
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10
  },
  row: {
    marginBottom: 16
  },
  genderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap'
  }
});