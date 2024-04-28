import { AssistantMessage, UserMessage } from '@ui/components';

export const OldChat: Component = () => {
    const MARKDOWN_TEST_MESSAGE = `
# Heading level 1

This is the first paragraph.

This is the second paragraph.

This is the third paragraph.

## Heading level 2

This is an [anchor](https://github.com).

### Heading level 3

This is **bold** and _italics_.

#### Heading level 4

This is \`inline\` code.

##### Heading level 5

This is an unordered list:

- One
- Two
- Three, and **bold**

This is an ordered list:

1. One
1. Two
1. Three

This is a complex list:

1. **Bold**: One
    - One
    - Two
    - Three
  
2. **Bold**: Three
    - One
    - Two
    - Three
  
3. **Bold**: Four
    - One
    - Two
    - Three

###### Heading level 6

> This is a blockquote.

This is a table:

| Vegetable | Description |
|-----------|-------------|
| Carrot    | A crunchy, orange root vegetable that is rich in vitamins and minerals. It is commonly used in soups, salads, and as a snack. |
| Broccoli  | A green vegetable with tightly packed florets that is high in fiber, vitamins, and antioxidants. It can be steamed, boiled, stir-fried, or roasted. |
| Spinach   | A leafy green vegetable that is dense in nutrients like iron, calcium, and vitamins. It can be eaten raw in salads or cooked in various dishes. |
| Bell Pepper | A colorful, sweet vegetable available in different colors such as red, yellow, and green. It is often used in stir-fries, salads, or stuffed recipes. |
| Tomato    | A juicy fruit often used as a vegetable in culinary preparations. It comes in various shapes, sizes, and colors and is used in salads, sauces, and sandwiches. |
| Cucumber   | A cool and refreshing vegetable with a high water content. It is commonly used in salads, sandwiches, or as a crunchy snack. |
| Zucchini | A summer squash with a mild flavor and tender texture. It can be sautéed, grilled, roasted, or used in baking recipes. |
| Cauliflower | A versatile vegetable that can be roasted, steamed, mashed, or used to make gluten-free alternatives like cauliflower rice or pizza crust. |
| Green Beans | Long, slender pods that are low in calories and rich in vitamins. They can be steamed, stir-fried, or used in casseroles and salads. |
| Potato | A starchy vegetable available in various varieties. It can be boiled, baked, mashed, or used in soups, fries, and many other dishes. |
`;
    return (
        <>
            <UserMessage>Can you render a example markdown?</UserMessage>
            <AssistantMessage>{MARKDOWN_TEST_MESSAGE}</AssistantMessage>
        </>
        // <div className='flex flex-col-reverse h-screen overflow-y-scroll'>
        //     <div className='mx-auto w-full px-2 lg:px-8 pb-8 flex flex-col stretch gap-8 flex-1'>
        //         {messages.length ? (
        //             <ul className='grid auto-rows-min	gap-4 max-w-2xl flex-1 mx-auto w-full'>
        //                 {messages.map((m) => (
        //                     <Message key={m.id} message={m} />
        //                 ))}
        //             </ul>
        //         ) : null}

        //         <form onSubmit={handleSubmit} className='max-w-2xl w-full mx-auto'>
        //             {/* Render any error message when trying to chat. */}
        //             {error ? (
        //                 <div className='p-3 rounded-lg bg-rose-100 border-2 border-rose-200 mb-3'>
        //                     <p className='font-sans text-sm text-red text-rose-800'>{error.message}</p>
        //                 </div>
        //             ) : null}
        //             {/* Render the chat input. */}
        //             <div className='relative'>
        //                 <input
        //                     className='w-full border-2 border-slate-200 rounded-lg p-2 font-sans text-base outline-none ring-offset-0 focus:border-slate-400 focus-visible:ring-2 focus-visible:ring-offset-2 ring-emerald-600 transition-[box-shadow,border-color] pr-10 disabled:opacity-60 disabled:cursor-not-allowed'
        //                     value={input}
        //                     onChange={handleInputChange}
        //                     aria-label='ask a question'
        //                     placeholder='Ask a question...'
        //                     disabled={!token}
        //                 />
        //                 <button
        //                     type='submit'
        //                     aria-label='send'
        //                     className='absolute top-0 right-0 bottom-0 text-emerald-600 outline-none p-3 disabled:text-slate-600 disabled:opacity-60 disabled:cursor-not-allowed hover:text-emerald-800 focus:text-emerald-800 transition-colors'
        //                     disabled={!input}
        //                 >
        //                     <PaperPlaneRight size='1em' />
        //                 </button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
    );
};
