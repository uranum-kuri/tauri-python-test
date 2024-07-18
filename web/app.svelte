<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";

  const getMessage = async (): Promise<string> => {
    return await invoke("simple_command", { message: "world" });
  };

  let promiseMessage = $state<ReturnType<typeof getMessage>>();

  const onClickMessage = () => {
    promiseMessage = getMessage();
  };
</script>

<section>
  <button onclick={onClickMessage}>get message</button>
  {#if promiseMessage}
    {#await promiseMessage}
      <p>loading...</p>
    {:then message}
      <h2>{message}</h2>
    {:catch e}
      <p>{e.message}</p>
    {/await}
  {/if}
</section>

<style>
  section {
    margin-inline: auto;
    max-width: 64rem;
  }
</style>
