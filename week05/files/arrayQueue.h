//Header file arrayQueue
 
#ifndef _ARRAYQUEUE_
#define _ARRAYQUEUE_
  
#include <iostream> 
#include <cassert>

#include "queueADT.h" 

using namespace std;

template <class ItemType>
class arrayQueue: public queueADT<ItemType>
{
public:
    const arrayQueue<ItemType>& operator=(const arrayQueue<ItemType>&); 
      //Overload the assignment operator.

    bool isEmptyQueue() const;
      //Function to determine whether the queue is empty.
      //Postcondition: Returns true if the queue is empty,
      //               otherwise returns false.

    bool isFullQueue() const;
      //Function to determine whether the queue is full.
      //Postcondition: Returns true if the queue is full,
      //               otherwise returns false.

    void initializeQueue();
      //Function to initialize the queue to an empty state.
      //Postcondition: The queue is empty.

    ItemType front() const;
      //Function to return the first element of the queue.
      //Precondition: The queue exists and is not empty.
      //Postcondition: If the queue is empty, the program 
      //               terminates; otherwise, the first 
      //               element of the queue is returned.  
    ItemType back() const;
      //Function to return the last element of the queue.
      //Precondition: The queue exists and is not empty.
      //Postcondition: If the queue is empty, the program 
      //               terminates; otherwise, the last 
      //               element of the queue is returned.

    void addQueue(const ItemType& queueElement);
      //Function to add queueElement to the queue.
      //Precondition: The queue exists and is not full.
      //Postcondition: The queue is changed and queueElement
      //               is added to the queue.

    void deleteQueue();
      //Function to remove the first element of the queue.
      //Precondition: The queue exists and is not empty.
      //Postcondition: The queue is changed and the first 
      //               element is removed from the queue.

    arrayQueue(int queueSize = 100); 
      //Constructor

    arrayQueue(const arrayQueue<ItemType>& otherQueue); 
      //Copy constructor

    ~arrayQueue(); 
      //Destructor

private:
    int maxQueueSize; //variable to store the maximum queue size
    int count;        //variable to store the number of
                      //elements in the queue
    int queueFront;   //variable to point to the first
                      //element of the queue
    int queueRear;    //variable to point to the last
                      //element of the queue
    ItemType *list;       //pointer to the array that holds 
                      //the queue elements 
};

#include "arrayQueue.cpp"
#endif
