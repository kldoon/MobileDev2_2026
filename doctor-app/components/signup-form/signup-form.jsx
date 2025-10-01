import { Button, CheckBox, Input } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import signupSchema from "../../utils/schemas/signup";
import { ValidationError } from "yup";
import DateTimePicker from '@react-native-community/datetimepicker';

const SignupForm = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    gender: 0,
    dob: new Date()
  });

  const [errors, setErrors] = useState({});

  const submit = () => {
    setErrors([]);
    signupSchema.validate(form, { abortEarly: false })
      .then(value => {
        console.log(value);
        // submission code
      })
      .catch(error => {
        if (error instanceof ValidationError) {
          const errorsObject = {};
          error.inner.forEach(err => {
            errorsObject[err.path] = err.message
          });
          setErrors(errorsObject)
        }
      })
  }

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
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          errorMessage={errors.firstName}
        />
      </View>
      <View style={styles.row}>
        <Input
          accessibilityLabel="Last Name"
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
      </View>
      <View style={styles.row}>
        <Input
          placeholder="Email"
          accessibilityLabel="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          errorMessage={errors.email}
        />
      </View>
      <View style={styles.row}>
        <Input
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          errorMessage={errors.mobile}
        />
      </View>
      <View style={styles.row}>
        <Input
          secureTextEntry={true}
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          errorMessage={errors.password}
        />
      </View>
      <View style={styles.row}>
        <Input
          secureTextEntry={true}
          placeholder="Verify Password"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          errorMessage={errors.confirmPassword}
        />
      </View>
      <TouchableOpacity
        style={styles.row}
        accessibilityLabel="Date of birth"
        onPress={() => { setShowDatePicker(true) }}
      >
        <Text>Date of Birth:</Text>
        <Text>{form.dob.toDateString()}</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <Text>Gender</Text>
        <CheckBox
          checked={form.gender === 0}
          onPress={() => setForm({ ...form, gender: 0 })}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          title="Male"
          accessibilityRole="checkbox"
        />
        <CheckBox
          checked={form.gender === 1}
          onPress={() => setForm({ ...form, gender: 1 })}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          title="Female"
          accessibilityRole="checkbox"
        />
      </View>
      <View
        style={styles.row}
        accessible={true}
      >
        <Button
          title="Submit" onPress={submit}
          accessibilityLabel="Save"
        />
        <Button
          title="Cancel"
          accessibilityLabel="Cancel"
          accessibilityHint="This will clear all inputs in the form"
          onPress={() => { setForm({}) }}
        />
      </View>
      {
        showDatePicker && (
          <DateTimePicker
            value={form.dob}
            mode="date"
            onChange={(_, selectedDate) => {
              const currentDate = selectedDate;
              setShowDatePicker(false);
              setForm(old => ({ ...old, dob: currentDate }))
            }}
          />
        )
      }
    </View >
  )
}

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
    marginBottom: 5
  }
});