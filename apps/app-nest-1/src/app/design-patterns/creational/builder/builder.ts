/**
 * Builder
 * - Allows to separate the construction of a complex object from its
 *   representation so that the same construction process can create different
 *   representations.
 * - May be accompanied by a director class that contains a predefined
 *   construction process.
 * - Does not expose the unfinished product while running construction steps
 *
 * Viable use cases:
 * - When there is a common input and many possible representations
 *   (or outputs)
 * - When the construction should be done in steps (a lot of which
 *   are optional)
 * - When you want to avoid a lot of subclasses or passing a lot of parameters
 *   to the constructor (a lot of which have a good default value most of
 *   the time)
 *
 * Sources:
 * - https://sourcemaking.com/design_patterns/builder
 * - https://refactoring.guru/design-patterns/builder
 */

/*
 * Simple example without an interface and just a single concrete
 * builder class.
 */
export class TailCliCommandBuilder {
  private command = 'tail';
  private arguments: string[] = [];
  private filePathArgument: string | undefined;
  private isFilePathSet = false;

  withLastLines(lines: number): TailCliCommandBuilder {
    this.arguments.push(`--lines ${lines}`);
    return this;
  }

  withFollow(): TailCliCommandBuilder {
    this.arguments.push('--follow');
    return this;
  }

  withVerbose(): TailCliCommandBuilder {
    this.arguments.push('--verbose');
    return this;
  }

  withFilePath(filePath: string): TailCliCommandBuilder {
    this.filePathArgument = filePath;
    this.isFilePathSet = true;
    return this;
  }

  build(): string {
    if (!this.isFilePathSet) {
      throw new Error('File path is not set.');
    }

    let builtCommand = this.command;
    if (this.arguments.length > 0) {
      const argumentsString = this.arguments.join(' ');
      builtCommand = `${builtCommand} ${argumentsString}`;
    }
    builtCommand = `${builtCommand} ${this.filePathArgument}`;

    return builtCommand;
  }
}

export class TailCliCommandWithFollowDirector {
  buildWithFollow(builder: TailCliCommandBuilder,filePath: string): TailCliCommandBuilder {
    return builder.withFollow().withFilePath(filePath);
  }

  buildWithFollowAndVerbose(builder: TailCliCommandBuilder, filePath: string): TailCliCommandBuilder {
    return builder.withFollow().withVerbose().withFilePath(filePath);
  }
}
