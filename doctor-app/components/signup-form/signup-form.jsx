import { Button, CheckBox, Input } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const SignupForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    gender: 0
  });

  const [errors, setErrors] = useState([]);

  const submit = () => {
    setErrors([]);
    if (form.firstName.trim().length < 2) {
      setErrors(old => [...old, "First Name is required!"]);
    }

    if (form.lastName.trim().length < 2) {
      setErrors(old => [...old, "Last is required!"]);
    }

    if (form.password.length < 4) {
      setErrors(old => [...old, "Password should be more than 5 Char!"]);
    }

    if (form.password !== form.confirmPassword) {
      setErrors(old => [...old, "The password and confirm should match!"]);
    }

    if (errors.length) {
      return;
    }

    console.log(form);
    // submission code
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Input
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
      </View>
      <View style={styles.row}>
        <Input
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
      </View>
      <View style={styles.row}>
        <Input placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </View>
      <View style={styles.row}>
        <Input
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        />
      </View>
      <View style={styles.row}>
        <Input
          secureTextEntry={true}
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </View>
      <View style={styles.row}>
        <Input
          secureTextEntry={true}
          placeholder="Verify Password"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        />
      </View>
      <View style={styles.row}>
        <Text>Gender</Text>
        <CheckBox
          checked={form.gender === 0}
          onPress={() => setForm({ ...form, gender: 0 })}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          title="Male"
        />
        <CheckBox
          checked={form.gender === 1}
          onPress={() => setForm({ ...form, gender: 1 })}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          title="Female"
        />
      </View>
      <View style={styles.row}>
        {errors.map(err => <Text style={styles.error} key={err}>{err}</Text>)}
      </View>
      <View style={styles.row}>
        <Button title="Submit" onPress={submit} />
      </View>
    </View>
  )
}

export default SignupForm;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 16,
    alignItems: "center"
  },
  row: {
    marginBottom: 5
  },
  error: {
    fontSize: 11,
    color: 'red'
  }
});