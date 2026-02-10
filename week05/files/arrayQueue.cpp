template <class ItemType>
bool arrayQueue<ItemType>::isEmptyQueue() const
{
    return (count == 0);
} //end isEmptyQueue

template <class ItemType>
bool arrayQueue<ItemType>::isFullQueue() const
{
    return (count == maxQueueSize);
} //end isFullQueue

template <class ItemType>
void arrayQueue<ItemType>::initializeQueue()
{
    queueFront = 0;
    queueRear = maxQueueSize - 1;
    count = 0;
} //end initializeQueue

template <class ItemType>
ItemType arrayQueue<ItemType>::front() const
{
    assert(!isEmptyQueue());
    return list[queueFront]; 
} //end front

template <class ItemType>
ItemType arrayQueue<ItemType>::back() const
{
    assert(!isEmptyQueue());
    return list[queueRear];
} //end back

template <class ItemType>
void arrayQueue<ItemType>::addQueue(const ItemType& newElement)
{
    if (!isFullQueue())
    {   
        queueRear = (queueRear + 1) % maxQueueSize; //use mod
                            //operator to advance queueRear  
                            //because the array is circular
        count++;
        list[queueRear] = newElement;
    }
    else
        cout << "Cannot add to a full queue." << endl; 
} //end addQueue

template <class ItemType>
void arrayQueue<ItemType>::deleteQueue()
{
    if (!isEmptyQueue())
    {   
        count--;
        queueFront = (queueFront + 1) % maxQueueSize; //use the
                        //mod operator to advance queueFront 
                        //because the array is circular 
    }
    else
        cout << "Cannot remove from an empty queue." << endl;
} //end deleteQueue

    //Constructor
template <class ItemType>
arrayQueue<ItemType>::arrayQueue(int queueSize)   
{
    if (queueSize <= 0)
    {
        cout << "Size of the array to hold the queue must "
             << "be positive." << endl;
        cout << "Creating an array of size 100." << endl;

        maxQueueSize = 100;
    }
    else
        maxQueueSize = queueSize;   //set maxQueueSize to 
                                    //queueSize

    queueFront = 0;                 //initialize queueFront
    queueRear = maxQueueSize - 1;   //initialize queueRear
    count = 0;
    list = new ItemType[maxQueueSize];  //create the array to
                                    //hold the queue elements
} //end constructor

    //Destructor
template <class ItemType>
arrayQueue<ItemType>::~arrayQueue()   
{
    delete [] list;
} //end destructor

template <class ItemType>
const arrayQueue<ItemType>& arrayQueue<ItemType>::operator=
	                   (const arrayQueue<ItemType>& otherQueue)
{
    cout << "Write the definition of the function "
         << "to overload the assignment operator." << endl;
} //end assignment operator

template <class ItemType>
arrayQueue<ItemType>::arrayQueue(const arrayQueue<ItemType>& otherQueue)
{
    cout << "Write the definition of the copy constructor."
         << endl;
} //end copy constructor
