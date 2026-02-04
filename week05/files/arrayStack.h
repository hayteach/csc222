// arrayStack.h — simplified placeholder
#ifndef ARRAYSTACK_H
#define ARRAYSTACK_H

#include "stackADT.h"

template <class ItemType>
class arrayStack : public stackADT<ItemType> {
public:
    arrayStack(int size = 100);
    void initializeStack() override;
    bool isEmptyStack() const override;
    bool isFullStack() const override;
    void push(const ItemType& newItem) override;
    void pop() override;
    ItemType top() const override;
    ~arrayStack();
private:
    int maxStackSize;
    int stackTop;
    ItemType* list;
};

#endif // ARRAYSTACK_H
