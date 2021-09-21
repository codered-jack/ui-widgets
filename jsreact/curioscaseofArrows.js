class Person {
  constructor(name) {
    this.name = name;
  }

  print = () => {
    console.log(this.name);
  };
}

class Employee extends Person {
  constructor(name, id) {
    super(name);
    this.id = id;
  }

  print() {
    console.log(this.name, this.id);
  }
}

const one = new Person("one");
one.print();

const two = new Employee("two", 2);
two.print();

//one
//two

// The Person class print() being an arrow function would be associated with object instance when created.

// The Employee print() being a regular one, would be available on Employee’s prototype.

// In case of one.print(), the output seems reasonable.

// In case of two.print(), one might expect the method overriding to work from initial impression. But in this case, two is an object created using Employee which extends Person. Now Person had print() method associated with instance. Meanwhile, Employee’s print() is available on its prototype.

// So two being an instance of Employee will look for print() in its instance first which it will find no thanks to Person’s implementation. And so proto of two will never be looked for print().
