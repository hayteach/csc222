// stackADT.h — interface for Stack ADT (placeholder)
#ifndef STACKADT_H
#define STACKADT_H

template <class ItemType>
class stackADT {
public:
    virtual void initializeStack() = 0;
    virtual bool isEmptyStack() const = 0;
    virtual bool isFullStack() const = 0;
    virtual void push(const ItemType& newItem) = 0;
    virtual void pop() = 0;
    virtual ItemType top() const = 0;
    virtual ~stackADT() {}
};

#endif // STACKADT_H
