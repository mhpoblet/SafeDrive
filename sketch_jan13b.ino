#include <Stepper.h>
#define STEPS 2038 // the number of steps in one revolution of your motor (28BYJ-48)

Stepper stepper(STEPS, 8, 10, 9, 11);

void setup() {
  Serial.begin(9600); // send and receive at 9600 baud
}

int number = 0;
int incomingByte = 0;   // for incoming serial data

void loop() {

   // send data only when you receive data:
   if (Serial.available() > 0) {
        stepper.setSpeed(10); // 1 rpm
        stepper.step(2038); // do 2038 steps -- corresponds to one revolution in one minute
        Serial.print("The number is ");
        Serial.println(number);    // print the number
        number++;
   }
   
}
